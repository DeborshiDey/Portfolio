import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
    }

    try {
        const { linkedInText } = req.body;

        if (!linkedInText) {
            return res.status(400).json({ error: "LinkedIn text is required" });
        }

        const prompt = `
      You are an expert at parsing LinkedIn profile information. Extract work experience data from the following LinkedIn profile text.
      
      LINKEDIN PROFILE TEXT:
      ${linkedInText}
      
      INSTRUCTIONS:
      1. Extract all work experience entries.
      2. For each entry, identify: company name, job title, start date, end date (or "Present" if current), and description.
      3. Format dates as "MMM YYYY" (e.g., "Jan 2020").
      4. Return the data as a JSON array.
      5. Do NOT include any explanatory text - ONLY the JSON array.
      
      OUTPUT FORMAT:
      Return ONLY a valid JSON array in this exact format:
      [
        {
          "company": "Company Name",
          "position": "Job Title",
          "startDate": "MMM YYYY",
          "endDate": "MMM YYYY" or "Present",
          "description": "Brief description of role and achievements"
        }
      ]
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // Robust JSON extraction for array
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : text;

        const experience = JSON.parse(jsonString);

        return res.status(200).json({ experience });
    } catch (error) {
        console.error("Error parsing LinkedIn:", error);
        return res.status(500).json({ error: "Failed to parse LinkedIn profile" });
    }
}
