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
        const { cvData, jobDescription } = req.body;

        if (!cvData) {
            return res.status(400).json({ error: "CV data is required" });
        }

        const prompt = `
      You are an expert professional resume writer. Generate a compelling professional summary for a CV.
      
      CV INFORMATION:
      Name: ${cvData.personalInfo?.fullName || ""}
      Title: ${cvData.personalInfo?.professionalTitle || ""}
      Experience: ${JSON.stringify(cvData.experience || [])}
      Education: ${JSON.stringify(cvData.education || [])}
      Skills: ${JSON.stringify([...(cvData.hardSkills || []), ...(cvData.softSkills || []), ...(cvData.skills || [])])}
      
      ${jobDescription ? `TARGET JOB:\n${jobDescription}\n` : ""}
      
      INSTRUCTIONS:
      1. Write a concise, impactful professional summary (3-4 sentences).
      2. Highlight key strengths, experience, and value proposition.
      3. Make it ATS-friendly and keyword-rich.
      4. Keep it professional and confident without being arrogant.
      5. Do NOT include any introductory text like "Here's a summary" - just the summary itself.
      
      OUTPUT FORMAT:
      Return ONLY the professional summary text.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();

        return res.status(200).json({ summary });
    } catch (error) {
        console.error("Error generating summary:", error);
        return res.status(500).json({ error: "Failed to generate summary" });
    }
}
