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
        const { company, position, description } = req.body;

        if (!description) {
            return res.status(400).json({ error: "Description is required" });
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

        return res.status(200).json({ enhancedDescription });
    } catch (error) {
        console.error("Error enhancing experience:", error);
        return res.status(500).json({ error: "Failed to enhance experience" });
    }
}
