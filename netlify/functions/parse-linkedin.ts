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
        const { linkedInText } = JSON.parse(event.body || "{}");

        if (!process.env.VITE_GEMINI_API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "VITE_GEMINI_API_KEY is not set" })
            };
        }

        if (!linkedInText || linkedInText.trim().length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "LinkedIn text is required" })
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are an expert at parsing LinkedIn profile data. Extract work experience information from the following text.
      
      LINKEDIN TEXT:
      ${linkedInText}

      INSTRUCTIONS:
      1. Extract all work experience entries
      2. For each entry, identify: company name, position/title, start date, end date (or "Present"), and description
      3. Format dates as "MMM YYYY" (e.g., "Jan 2020")
      4. If end date is current, use "Present" and set current to true, otherwise set current to false
      5. Generate a unique ID for each entry (use company-position format, lowercase, hyphenated)
      
      OUTPUT FORMAT:
      Return ONLY a valid JSON object with the following structure:
      {
        "experience": [
          {
            "id": "company-position",
            "company": "Company Name",
            "position": "Job Title",
            "startDate": "MMM YYYY",
            "endDate": "MMM YYYY" or "Present",
            "current": true or false,
            "description": "Job description and key achievements"
          }
        ]
      }
      
      Do not include markdown formatting or explanations. Return only the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json\n|\n```/g, "").trim();
        const parsedData = JSON.parse(jsonString);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedData)
        };
    } catch (error) {
        console.error("Error parsing LinkedIn data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error instanceof Error ? error.message : "Failed to parse LinkedIn data"
            })
        };
    }
};
