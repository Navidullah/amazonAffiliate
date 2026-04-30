// test-fallback.js - Updated version
const testURL = "https://www.facebook.com/share/v/1Kz54Nesw5/";

async function testFallback() {
  console.log("🔍 Testing Your Render API...\n");

  // Make sure to replace this with your actual Render URL
  const YOUR_API_URL =
    "https://facebook-video-downloader-api-s2ii.onrender.com"; // REPLACE WITH YOUR ACTUAL URL

  try {
    console.log(`📡 Calling: ${YOUR_API_URL}/download`);
    console.log(`📹 Video URL: ${testURL}\n`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(
      `${YOUR_API_URL}/download?url=${encodeURIComponent(testURL)}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      },
    );

    clearTimeout(timeoutId);

    console.log(`📊 Response Status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("\n✅ SUCCESS! Your Render API is working!\n");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`📹 Title: ${data.data?.title || "N/A"}`);
      console.log(`🔗 Video URL Found: ${data.data?.video_url ? "Yes" : "No"}`);
      console.log(
        `🎬 Video URL Preview: ${data.data?.video_url?.substring(0, 100)}...`,
      );
      console.log(`📦 Response Structure: ${Object.keys(data).join(", ")}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Test if the video URL is accessible
      if (data.data?.video_url) {
        console.log("\n🔍 Testing if video URL is accessible...");
        const videoCheck = await fetch(data.data.video_url, { method: "HEAD" });
        if (videoCheck.ok) {
          console.log("✅ Video URL is accessible!");
        } else {
          console.log("⚠️ Video URL returned status:", videoCheck.status);
        }
      }

      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log("\n❌ FAILED! Your Render API returned an error.\n");
      console.log(
        `Error: ${errorData.message || errorData.error || "Unknown error"}`,
      );
      console.log(`Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log("\n❌ ERROR! Could not connect to your Render API.\n");

    if (error.name === "AbortError") {
      console.log("⏰ Timeout: The API took too long to respond (15 seconds)");
    } else if (error.code === "ENOTFOUND") {
      console.log(
        `🌐 DNS Error: Cannot resolve hostname. Make sure your Render URL is correct.`,
      );
      console.log(`   Current URL: ${YOUR_API_URL}`);
    } else if (error.code === "ECONNREFUSED") {
      console.log(
        `🔌 Connection refused: The API server is not running or unreachable.`,
      );
    } else {
      console.log(`💥 Error: ${error.message}`);
    }

    console.log("\n💡 Troubleshooting Tips:");
    console.log("1. Make sure your Render API is deployed and running");
    console.log("2. Check if your Render URL is correct");
    console.log(
      "3. Try opening the URL in your browser: " + YOUR_API_URL + "/health",
    );
    console.log("4. Check Render logs for any errors");

    return false;
  }
}

// Also test the health endpoint
async function testHealth() {
  console.log("\n🏥 Testing Health Endpoint...\n");
  const YOUR_API_URL =
    "https://facebook-video-downloader-api-s2ii.onrender.com"; // REPLACE WITH YOUR ACTUAL URL

  try {
    const response = await fetch(`${YOUR_API_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Health check successful!");
      console.log(`   Status: ${data.status}`);
      console.log(`   Service: ${data.service}`);
      return true;
    } else {
      console.log(`❌ Health check failed with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Health check error: ${error.message}`);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log("═══════════════════════════════════════════");
  console.log("   Testing Your Render API Fallback");
  console.log("═══════════════════════════════════════════\n");

  // First test health endpoint
  const healthOk = await testHealth();

  console.log("\n───────────────────────────────────────────\n");

  // Then test download endpoint
  const downloadOk = await testFallback();

  console.log("\n═══════════════════════════════════════════");
  if (healthOk && downloadOk) {
    console.log("   ✅ YOUR API IS READY FOR FALLBACK! 🎉");
  } else if (healthOk && !downloadOk) {
    console.log("   ⚠️ API is online but download failed");
  } else {
    console.log("   ❌ API IS NOT ACCESSIBLE");
    console.log("\n   Please deploy your API to Render first");
  }
  console.log("═══════════════════════════════════════════");
}

// Run the tests
runTests();
