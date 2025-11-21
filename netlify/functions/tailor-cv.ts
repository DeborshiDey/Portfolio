import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Handler, HandlerEvent } from "@netlify/functions";

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
        const apiKey = process.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "VITE_GEMINI_API_KEY is not configured" })
            };
        }

        const { cvData } = JSON.parse(event.body || "{}");
        const { personalInfo, experience, skills, targetJob } = cvData;

        if (!targetJob.description) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Target job description is missing" })
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are an expert CV writer. Your task is to tailor a CV for a specific job description.
      
      TARGET JOB:
      Company: ${targetJob.company}
      Position: ${targetJob.position}
      Description: ${targetJob.description}

      CURRENT CV DATA:
      Summary: ${personalInfo.summary}
      Experience: ${JSON.stringify(experience)}
      Skills: ${skills.join(", ")}

      INSTRUCTIONS:
      1. Rewrite the "Professional Summary" to be impactful and aligned with the target job.
      2. Rewrite the "Description" for each experience item to highlight relevant achievements and keywords from the job description. Keep them concise and action-oriented.
      3. Suggest a list of "Skills" that are relevant to the job and match the candidate's profile.
      
      OUTPUT FORMAT:
      Return ONLY a valid JSON object with the following structure:
      {
        "summary": "New professional summary...",
        "experience": [
          { "id": "same_id_as_input", "description": "New description..." }
        ],
        "skills": ["Skill 1", "Skill 2", ...]
      }
      Do not include markdown formatting or explanations.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json\n|\n```/g, "").trim();
        const tailoredData = JSON.parse(jsonString);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tailoredData)
        };
    } catch (error) {
        console.error("Error tailoring CV:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to tailor CV" })
        };
    }
};
