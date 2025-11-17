# Deborshi Dey — Data Scientist Portfolio

A modern, human-friendly portfolio for a data scientist focusing on ML, NLP, OSINT, and misinformation/geopolitical analysis. Built with React + TypeScript + Vite and Tailwind.

## Features

- Dark-first design with high-contrast accents
- Hero with name, role line, and clear CTAs
- Sections: Projects, About, Experience, Skills, Resume, Contact
- Email contact form integrated with EmailJS
- Responsive layout and accessible markup

## Quick Start

- Requirements: Node.js 18+
- Install: `npm install`
- Develop: `npm run dev` → open `http://localhost:5173`
- Build: `npm run build` → outputs to `dist/`

## Configuration

- Core profile settings live in `src/lib/siteConfig.ts`
  - Name, title line, email, phone, location
  - Social links (GitHub, LinkedIn)
  - Resume and photo URLs
  - Headline/quick facts and languages

## Contact Form (EmailJS)

- Add environment variables (local `.env.local`, not committed):
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- Form lives in `src/components/Contact.tsx` and sends via `emailjs.send(...)`

## Deploy to Netlify

- This repo contains `netlify.toml` and `public/_redirects` for SPA routing
- Netlify settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Environment variables: same `VITE_EMAILJS_*` values for builds
- Alternatively, drag & drop the `dist/` folder into Netlify for an instant deploy

## Editing Content

- Projects: `src/components/Projects.tsx`
  - Each card includes title, summary, tech, and external links
- About & Experience: `src/components/About.tsx`, `src/components/Experience.tsx`
  - Update bio, timeline, and highlights
- Skills: `src/components/Skills.tsx`
  - Adjust categories and skill bars

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- EmailJS (optional)

## Notes

- `.env.local` is ignored by Git; do not commit secrets
- Keep screenshots and PDFs in `public/` and reference them via relative paths
