export type TemplateId = "executive" | "modern" | "classic" | "side-header" | "sidebar";
export type TemplateLayout = "standard" | "sidebar" | "left-header";

export interface Template {
    id: TemplateId;
    name: string;
    description: string;
    layout: TemplateLayout;
    colors: {
        primary: string;
        secondary: string;
        text: string;
        background: string;
        accent?: string;
        headerBackground?: string;
        headerText?: string;
    };
}

export const templates: Template[] = [
    {
        id: "executive",
        name: "Executive",
        description: "Professional dark header design for senior roles",
        layout: "standard",
        colors: {
            primary: "#374151", // Dark Gray
            secondary: "#4b5563",
            text: "#1f2937",
            background: "#ffffff",
            headerBackground: "#374151",
            headerText: "#ffffff",
        },
    },
    {
        id: "modern",
        name: "Modern",
        description: "Clean design with blue accents",
        layout: "standard",
        colors: {
            primary: "#2563eb", // Blue
            secondary: "#4b5563",
            text: "#1f2937",
            background: "#ffffff",
            headerBackground: "#ffffff",
            headerText: "#2563eb",
        },
    },
    {
        id: "classic",
        name: "Classic",
        description: "Elegant centered design with teal accents",
        layout: "standard",
        colors: {
            primary: "#0d9488", // Teal
            secondary: "#4b5563",
            text: "#1f2937",
            background: "#ffffff",
            headerBackground: "#ffffff",
            headerText: "#0d9488",
        },
    },
    {
        id: "side-header",
        name: "Side Header",
        description: "Distinctive layout with left-aligned section headers",
        layout: "left-header",
        colors: {
            primary: "#000000",
            secondary: "#4b5563",
            text: "#1f2937",
            background: "#d1fae5", // Light Mint background for sidebar effect if needed, but here it's full width usually. Let's keep white for now, maybe light gray for the header column.
            headerBackground: "#e5e7eb", // Light gray for the left column
            headerText: "#000000",
        },
    },
    {
        id: "sidebar",
        name: "Sidebar",
        description: "Modern layout with a personal info sidebar",
        layout: "sidebar",
        colors: {
            primary: "#2563eb",
            secondary: "#e5e7eb", // Light text for sidebar
            text: "#1f2937",
            background: "#ffffff",
            headerBackground: "#2563eb", // Blue sidebar
            headerText: "#ffffff",
        },
    },
];

export const getTemplate = (id: string): Template => {
    return templates.find((t) => t.id === id) || templates[0];
};
