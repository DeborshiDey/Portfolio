import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler, HandlerEvent } from "@netlify/functions";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

export const handler: Handler = async (event: HandlerEvent) => {
    // Handle CORS
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed" })
        };
    }

    try {
        const { cvData, jobDescription } = JSON.parse(event.body || "{}");

        if (!process.env.VITE_GEMINI_API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "VITE_GEMINI_API_KEY is not set" })
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are an expert CV writer. Your task is to write or rewrite a "Professional Summary" for a CV.
      
      CANDIDATE PROFILE:
      Experience: ${JSON.stringify(cvData.experience)}
      Skills: ${cvData.skills.join(", ")}
      Current Summary: ${cvData.personalInfo.summary}

      TARGET JOB (Optional):
      ${jobDescription || "Not specified"}

      INSTRUCTIONS:
      1. Write a professional, impactful, and concise summary (3-5 sentences).
      2. Highlight key achievements and skills from the candidate's profile.
      3. If a target job is provided, tailor the summary to align with its requirements.
      4. Use active voice and professional tone.
      5. Return ONLY the summary text. Do not include "Here is the summary:" or quotes.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ summary })
        };
    } catch (error) {
        console.error("Error generating summary:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error instanceof Error ? error.message : "Failed to generate summary"
            })
        };
    }
};
