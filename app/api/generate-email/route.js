import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function POST(request) {
  try {
    const { prompt, tone } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Use the current Gemini 3 model
    // Options: 'gemini-3-pro', 'gemini-3-flash', or 'gemini-2.5-flash'
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const toneInstructions = {
      professional:
        "Write in a formal, business-appropriate tone with proper salutations and closings.",
      friendly: "Write in a warm, conversational tone that builds rapport.",
      casual: "Write in a relaxed, informal tone like writing to a friend.",
      persuasive:
        "Write convincingly with compelling arguments and a clear call-to-action.",
      urgent:
        "Convey importance and time-sensitivity while remaining professional.",
    };

    const promptText = `
      Generate a complete email based on this request: "${prompt}"
      
      Tone: ${toneInstructions[tone] || toneInstructions.professional}
      
      Return a JSON object with:
      - subject: A compelling subject line
      - body: The complete email body with proper formatting
      
      The email should be ready to send with no placeholders.
      Format your response as valid JSON only, no markdown formatting.
    `;

    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();

    // Clean the response and parse JSON
    const cleanText = text.replace(/```json|```/g, "").trim();
    const emailData = JSON.parse(cleanText);

    return NextResponse.json(emailData);
  } catch (error) {
    console.error("Email generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate email: " + error.message },
      { status: 500 },
    );
  }
}
