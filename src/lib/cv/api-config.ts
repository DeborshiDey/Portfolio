/**
 * API Configuration
 * Auto-detects deployment platform and returns the correct API base URL
 */

// Detect if we're on Vercel or Netlify
const isVercel = typeof process !== 'undefined' && process.env.VERCEL === '1';
const isNetlify = typeof process !== 'undefined' && process.env.NETLIFY === 'true';

// For client-side detection, check the hostname
const getAPIBase = (): string => {
    // In development, prefer Netlify functions (or use Vercel if VERCEL env is set)
    if (import.meta.env.DEV) {
        return '/.netlify/functions';
    }

    // In production, detect based on environment or default to /api (Vercel)
    if (isNetlify || window.location.hostname.includes('netlify')) {
        return '/.netlify/functions';
    }

    // Default to Vercel API routes
    return '/api';
};

export const API_BASE = getAPIBase();

export const API_ENDPOINTS = {
    enhanceExperience: `${API_BASE}/enhance-experience`,
    generateSummary: `${API_BASE}/generate-summary`,
    parseLinkedIn: `${API_BASE}/parse-linkedin`,
    tailorCV: `${API_BASE}/tailor-cv`,
};
