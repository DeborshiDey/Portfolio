import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler, HandlerEvent } from "@netlify/functions";

const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "VITE_GEMINI_API_KEY is not set" })
        };
    }

    try {
        const { company, position, description } = JSON.parse(event.body || "{}");

        if (!description) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Description is required" })
            };
        }

        const prompt = `
      You are an expert professional resume writer. Rewrite and enhance the following job description for a CV.
      
      CONTEXT:
      Role: ${position}
      Company: ${company}
      
      ORIGINAL DESCRIPTION:
      ${description}
      
      INSTRUCTIONS:
      1. Rewrite the description into 3-5 punchy, impact-focused bullet points.
      2. Start each bullet point with a strong action verb (e.g., "Spearheaded", "Developed", "Optimized").
      3. Quantify achievements where possible (even if you have to use placeholders like "[X]%").
      4. Focus on results and impact, not just duties.
      5. Keep it professional, concise, and ATS-friendly.
      6. Do NOT include any introductory or concluding text. Just the bullet points.
      
      OUTPUT FORMAT:
      Return ONLY the bullet points, each on a new line, starting with "• ".
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const enhancedDescription = response.text().trim();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ enhancedDescription })
        };
    } catch (error) {
        console.error("Error enhancing experience:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to enhance experience" })
        };
    }
};
