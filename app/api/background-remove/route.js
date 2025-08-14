export async function POST(req) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server missing API key" }), {
        status: 500,
      });
    }

    const formData = await req.formData();
    const imageFile = formData.get("image_file");
    if (!imageFile || typeof imageFile === "string") {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }

    const upstreamForm = new FormData();
    upstreamForm.append("image_file", imageFile, imageFile.name || "image.png");
    upstreamForm.append("size", "auto");

    const upstream = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: upstreamForm,
    });

    if (!upstream.ok) {
      let msg = "Background removal failed";
      try {
        const j = await upstream.json();
        msg = j?.errors?.[0]?.title || msg;
      } catch {}
      return new Response(JSON.stringify({ error: msg }), {
        status: upstream.status,
      });
    }

    const blob = await upstream.blob();
    return new Response(blob, { headers: { "Content-Type": "image/png" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
    });
  }
}
