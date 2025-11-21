import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    return res.status(200).json({
        status: "ok",
        message: "Vercel API is working!",
        envCheck: {
            hasApiKey: !!apiKey,
            keyLength: apiKey ? apiKey.length : 0,
            nodeEnv: process.env.NODE_ENV
        },
        timestamp: new Date().toISOString()
    });
}
