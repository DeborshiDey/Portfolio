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
    const { cvData } = req.body;

    if (!cvData || !cvData.targetJob) {
      return res.status(400).json({ error: "CV data and target job are required" });
    }

    const prompt = `
      You are an expert resume writer specializing in tailoring CVs for specific job applications.
      
      TARGET JOB:
      Company: ${cvData.targetJob.company}
      Position: ${cvData.targetJob.position}
      Job Description: ${cvData.targetJob.description}
      
      CURRENT CV DATA:
      Summary: ${cvData.personalInfo?.summary || ""}
      Experience: ${JSON.stringify(cvData.experience || [])}
      Skills: ${JSON.stringify([...(cvData.hardSkills || []), ...(cvData.softSkills || []), ...(cvData.skills || [])])}
      
      INSTRUCTIONS:
      1. Tailor the professional summary to align with the target job.
      2. For each experience entry, rewrite the description to highlight relevant skills and achievements for this role.
      3. Select the most relevant hard skills and soft skills to emphasize (from the existing skills list).
      4. Make it ATS-friendly with keywords from the job description.
      5. Return ONLY valid JSON - no explanatory text.
      
      OUTPUT FORMAT:
      Return ONLY a valid JSON object in this exact format:
      {
        "summary": "Tailored professional summary",
        "experience": [
          {
            "id": "original-id",
            "description": "Tailored description focusing on relevant achievements"
          }
        ],
        "hardSkills": ["Skill 1", "Skill 2"],
        "softSkills": ["Skill 1", "Skill 2"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;

    const tailoredData = JSON.parse(jsonString);

    return res.status(200).json(tailoredData);
  } catch (error) {
    console.error("Error tailoring CV:", error);
    return res.status(500).json({ error: "Failed to tailor CV" });
  }
}
