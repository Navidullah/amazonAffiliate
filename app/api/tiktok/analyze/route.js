// app/api/tiktok/analyze/route.js
import { NextResponse } from "next/server";

// API Configuration with Failover
const API_CONFIGS = [
  {
    id: 1,
    name: "TikTok Video Downloader API",
    key: process.env.TIKTOK_API_KEY_1,
    host: process.env.TIKTOK_API_HOST_1,
    endpoint: process.env.TIKTOK_API_ENDPOINT_1 || "/media",
    paramName: process.env.TIKTOK_API_PARAM_1 || "videoUrl",
    limit: parseInt(process.env.TIKTOK_API_LIMIT_1) || 50,
    used: 0,
  },
  {
    id: 2,
    name: "TikTok Downloader Backup API",
    key: process.env.TIKTOK_API_KEY_2,
    host: process.env.TIKTOK_API_HOST_2,
    endpoint: process.env.TIKTOK_API_ENDPOINT_2 || "/video-info",
    paramName: process.env.TIKTOK_API_PARAM_2 || "url",
    limit: parseInt(process.env.TIKTOK_API_LIMIT_2) || 50,
    used: 0,
  },
  {
    id: 3,
    name: "TikTok Full Info API",
    key: process.env.TIKTOK_API_KEY_3,
    host: process.env.TIKTOK_API_HOST_3,
    endpoint: process.env.TIKTOK_API_ENDPOINT_3 || "/get",
    paramName: process.env.TIKTOK_API_PARAM_3 || "url",
    limit: parseInt(process.env.TIKTOK_API_LIMIT_3) || 100,
    used: 0,
  },
].filter((api) => api.key && api.host); // Only include configured APIs

console.log(`✅ Loaded ${API_CONFIGS.length} TikTok APIs for failover`);

function isValidTikTokUrl(url) {
  const patterns = [
    /tiktok\.com\/@[\w.-]+\/video\/\d+/i,
    /tiktok\.com\/@[\w.-]+\/photo\/\d+/i,
    /vm\.tiktok\.com\/[\w]+/i,
    /tiktok\.com\/t\/[\w]+/i,
  ];
  return patterns.some((pattern) => pattern.test(url));
}

async function fetchWithTimeout(url, options, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function POST(request) {
  const startTime = Date.now();

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!isValidTikTokUrl(url)) {
      return NextResponse.json(
        { error: "Invalid TikTok video URL. Please check and try again." },
        { status: 400 },
      );
    }

    let data = null;
    let usedApi = null;
    let errors = [];

    // Try each API in order until one succeeds
    for (const api of API_CONFIGS) {
      if (api.used >= api.limit) {
        errors.push(
          `API ${api.id} (${api.name}) rate limit exceeded (${api.limit}/${api.limit})`,
        );
        continue;
      }

      const params = new URLSearchParams();
      params.append(api.paramName, url);
      const apiUrl = `https://${api.host}${api.endpoint}?${params.toString()}`;

      console.log(`📡 Trying API ${api.id}: ${api.name}`);

      try {
        const response = await fetchWithTimeout(
          apiUrl,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": api.key,
              "x-rapidapi-host": api.host,
            },
          },
          15000,
        ); // 15 second timeout

        if (response.ok) {
          const responseData = await response.json();

          // Extract video URL from response (handle different response structures)
          let videoUrl = null;
          if (responseData.downloadUrl) videoUrl = responseData.downloadUrl;
          else if (responseData.video_url) videoUrl = responseData.video_url;
          else if (responseData.video) videoUrl = responseData.video;
          else if (responseData.url) videoUrl = responseData.url;
          else if (responseData.data?.downloadUrl)
            videoUrl = responseData.data.downloadUrl;
          else if (responseData.data?.video_url)
            videoUrl = responseData.data.video_url;

          if (videoUrl) {
            data = responseData;
            usedApi = api;
            api.used++;
            console.log(
              `✅ API ${api.id} succeeded! (${api.used}/${api.limit})`,
            );
            break;
          } else {
            console.log(`⚠️ API ${api.id} returned but no video URL found`);
            errors.push(`API ${api.id}: No video URL in response`);
          }
        } else {
          const errorText = await response.text();
          console.log(`❌ API ${api.id} failed: ${response.status}`);
          errors.push(`API ${api.id}: HTTP ${response.status}`);
        }
      } catch (err) {
        console.log(`❌ API ${api.id} error: ${err.message}`);
        errors.push(`API ${api.id}: ${err.message}`);
      }
    }

    if (!data || !usedApi) {
      const errorMessage =
        errors.length > 0
          ? `All APIs failed: ${errors.join("; ")}`
          : "No APIs configured. Please check your API keys.";

      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }

    // Extract video URL
    let videoUrl = data.downloadUrl || data.video_url || data.video || data.url;
    if (!videoUrl && data.data) {
      videoUrl =
        data.data.downloadUrl || data.data.video_url || data.data.video;
    }

    // Build response
    const videoInfo = {
      id: data.id || data.video_id,
      title: data.description || data.title || data.desc || "TikTok Video",
      thumbnail:
        data.cover || data.thumbnail || "https://picsum.photos/400/300",
      duration: data.duration || 30,
      author:
        data.author?.unique_id ||
        data.author?.username ||
        data.author ||
        data.nickname,
      plays: data.stats?.playCount || data.play_count || data.plays,
      likes: data.stats?.diggCount || data.digg_count || data.likes,
      shares: data.stats?.shareCount || data.share_count,
      comments: data.stats?.commentCount || data.comment_count,
      qualities: [
        {
          label: "🎬 No Watermark (HD)",
          url: videoUrl,
          type: "hd",
        },
      ],
      apiUsed: usedApi.id,
      responseTime: `${Date.now() - startTime}ms`,
    };

    // Add audio if available
    const audioUrl = data.music_url || data.music || data.audio;
    if (audioUrl) {
      videoInfo.qualities.push({
        label: "🎵 Audio Only (MP3)",
        url: audioUrl,
        type: "audio",
      });
    }

    return NextResponse.json(videoInfo);
  } catch (error) {
    console.error("TikTok API Error:", error);
    return NextResponse.json(
      { error: "Failed to process video. Please try again." },
      { status: 500 },
    );
  }
}

// Status endpoint to check API health
export async function GET() {
  return NextResponse.json({
    status: "operational",
    apis: API_CONFIGS.map((api) => ({
      id: api.id,
      name: api.name,
      host: api.host,
      used: api.used,
      limit: api.limit,
      remaining: api.limit - api.used,
      available: api.used < api.limit,
    })),
    totalApis: API_CONFIGS.length,
    timestamp: new Date().toISOString(),
  });
}
