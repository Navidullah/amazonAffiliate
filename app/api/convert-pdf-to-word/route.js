import { NextResponse } from "next/server";

const DOCX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const CLOUDCONVERT_API_BASE =
  process.env.CLOUDCONVERT_API_BASE || "https://api.cloudconvert.com/v2";

function createTimeoutSignal(timeoutMs = 90000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, clear: () => clearTimeout(timeout) };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 90000) {
  const { signal, clear } = createTimeoutSignal(timeoutMs);
  try {
    return await fetch(url, { ...options, signal });
  } finally {
    clear();
  }
}

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function convertWithDirectProvider({
  url,
  file,
  authHeaderName,
  authHeaderValue,
}) {
  const body = new FormData();
  body.append("file", file, file.name || "document.pdf");

  const headers = {};
  if (authHeaderName && authHeaderValue) {
    headers[authHeaderName] = authHeaderValue;
  }

  return fetchWithTimeout(
    url,
    {
      method: "POST",
      headers,
      body,
    },
    90000,
  );
}

async function convertWithCloudConvert({ file, apiKey }) {
  const jobResponse = await fetchWithTimeout(
    `${CLOUDCONVERT_API_BASE}/jobs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: {
          "import-my-file": {
            operation: "import/upload",
          },
          "convert-my-file": {
            operation: "convert",
            input: ["import-my-file"],
            input_format: "pdf",
            output_format: "docx",
          },
          "export-my-file": {
            operation: "export/url",
            input: ["convert-my-file"],
            inline: false,
            archive_multiple_files: false,
          },
        },
      }),
    },
    60000,
  );

  if (!jobResponse.ok) {
    const errorText = await jobResponse.text();
    throw new Error(errorText || "CloudConvert job creation failed.");
  }

  const jobData = await parseJsonSafe(jobResponse);
  const jobId = jobData?.data?.id;
  const importTask = jobData?.data?.tasks?.find(
    (task) => task.name === "import-my-file",
  );
  const uploadForm = importTask?.result?.form;

  if (!jobId || !uploadForm?.url) {
    throw new Error("CloudConvert upload session was not initialized.");
  }

  const uploadBody = new FormData();
  const uploadParams = uploadForm.parameters || {};
  Object.entries(uploadParams).forEach(([key, value]) => {
    uploadBody.append(key, value);
  });
  uploadBody.append("file", file, file.name || "document.pdf");

  const uploadResponse = await fetchWithTimeout(
    uploadForm.url,
    {
      method: uploadForm.method || "POST",
      body: uploadBody,
    },
    90000,
  );

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(errorText || "CloudConvert file upload failed.");
  }

  let exportFileUrl = "";
  for (let i = 0; i < 25; i += 1) {
    await sleep(2000);
    const statusResponse = await fetchWithTimeout(
      `${CLOUDCONVERT_API_BASE}/jobs/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
      45000,
    );

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      throw new Error(errorText || "CloudConvert status check failed.");
    }

    const statusData = await parseJsonSafe(statusResponse);
    const jobStatus = statusData?.data?.status;

    if (jobStatus === "error") {
      throw new Error("CloudConvert conversion failed.");
    }

    if (jobStatus === "finished") {
      const exportTask = statusData?.data?.tasks?.find(
        (task) => task.name === "export-my-file",
      );
      exportFileUrl = exportTask?.result?.files?.[0]?.url || "";
      break;
    }
  }

  if (!exportFileUrl) {
    throw new Error("CloudConvert timed out before finishing conversion.");
  }

  const fileResponse = await fetchWithTimeout(exportFileUrl, {}, 90000);
  if (!fileResponse.ok) {
    const errorText = await fileResponse.text();
    throw new Error(errorText || "CloudConvert export download failed.");
  }

  return fileResponse.blob();
}

export async function POST(req) {
  try {
    const primaryUrl = process.env.RENDER_API_URL;
    const fallbackUrl = process.env.PDF_FALLBACK_API_URL;
    const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY;

    if (!primaryUrl && !fallbackUrl && !cloudConvertApiKey) {
      return NextResponse.json(
        { error: "No conversion provider is configured." },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (
      file.type !== "application/pdf" &&
      !String(file.name || "").toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file." },
        { status: 400 },
      );
    }

    const maxSizeInBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File is too large. Maximum supported size is 25 MB." },
        { status: 413 },
      );
    }

    let lastErrorMessage = "Conversion failed.";

    const providerRunners = [
      {
        name: "primary",
        enabled: Boolean(primaryUrl),
        run: () =>
          convertWithDirectProvider({
            url: primaryUrl,
            file,
            authHeaderName: process.env.PDF_PRIMARY_AUTH_HEADER_NAME,
            authHeaderValue: process.env.PDF_PRIMARY_AUTH_HEADER_VALUE,
          }),
        isDirectResponse: true,
      },
      {
        name: "cloudconvert",
        enabled: Boolean(cloudConvertApiKey),
        run: () => convertWithCloudConvert({ file, apiKey: cloudConvertApiKey }),
        isDirectResponse: false,
      },
      {
        name: "fallback",
        enabled: Boolean(fallbackUrl),
        run: () =>
          convertWithDirectProvider({
            url: fallbackUrl,
            file,
            authHeaderName: process.env.PDF_FALLBACK_AUTH_HEADER_NAME,
            authHeaderValue: process.env.PDF_FALLBACK_AUTH_HEADER_VALUE,
          }),
        isDirectResponse: true,
      },
    ].filter((provider) => provider.enabled);

    for (const provider of providerRunners) {
      try {
        if (provider.isDirectResponse) {
          const providerResponse = await provider.run();

          if (!providerResponse.ok) {
            const errorText = await providerResponse.text();
            lastErrorMessage = errorText || "Conversion failed";
            // Retry next provider only for transient failures.
            if (
              providerResponse.status >= 500 ||
              providerResponse.status === 429
            ) {
              continue;
            }
            return NextResponse.json(
              { error: lastErrorMessage },
              { status: providerResponse.status },
            );
          }

          const blob = await providerResponse.blob();
          return new NextResponse(blob, {
            status: 200,
            headers: {
              "Content-Type": DOCX_CONTENT_TYPE,
              "Content-Disposition": "attachment; filename=converted.docx",
              "x-conversion-provider": provider.name,
            },
          });
        }

        const blob = await provider.run();
        return new NextResponse(blob, {
          status: 200,
          headers: {
            "Content-Type": DOCX_CONTENT_TYPE,
            "Content-Disposition": "attachment; filename=converted.docx",
            "x-conversion-provider": provider.name,
          },
        });
      } catch (error) {
        if (error?.name === "AbortError") {
          lastErrorMessage = "Conversion timed out. Please try again.";
        } else if (error?.message) {
          lastErrorMessage = error.message;
        } else {
          lastErrorMessage = "Provider request failed.";
        }
        // Try next provider on timeout/network errors.
      }
    }

    return NextResponse.json(
      {
        error:
          lastErrorMessage ||
          "All conversion providers are currently unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  } catch (error) {
    if (error?.name === "AbortError") {
      return NextResponse.json(
        { error: "Conversion timed out. Please try again with a smaller file." },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
