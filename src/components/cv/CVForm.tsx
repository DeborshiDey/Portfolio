import React, { useState } from "react";
import { CVData, Experience, Education } from "@/lib/cv/types";
import { Plus, Trash2, Sparkles, Loader2, Linkedin, Wand2 } from "lucide-react";
import LinkedInImport from "./LinkedInImport";
import { API_ENDPOINTS } from "@/lib/cv/api-config";

interface CVFormProps {
    data: CVData;
    onChange: (data: CVData) => void;
}

export default function CVForm({ data, onChange }: CVFormProps) {
    const [isTailoring, setIsTailoring] = useState(false);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [showLinkedInImport, setShowLinkedInImport] = useState(false);
    const [enhancingExperienceId, setEnhancingExperienceId] = useState<string | null>(null);

    const handleChange = (section: keyof CVData, field: string, value: any) => {
        onChange({
            ...data,
            [section]: {
                ...data[section as keyof CVData] as any,
                [field]: value,
            },
        });
    };

    const handleArrayChange = (
        section: "experience" | "education",
        index: number,
        field: string,
        value: any
    ) => {
        const newArray = [...data[section]];
        (newArray[index] as any)[field] = value;
        onChange({
            ...data,
            [section]: newArray,
        });
    };

    const addItem = (section: "experience" | "education") => {
        const newItem =
            section === "experience"
                ? {
                    id: crypto.randomUUID(),
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                }
                : {
                    id: crypto.randomUUID(),
                    school: "",
                    degree: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "", // Added description for education
                };

        onChange({
            ...data,
            [section]: [...data[section], newItem as any],
        });
    };

    const removeItem = (section: "experience" | "education", index: number) => {
        const newArray = [...data[section]];
        newArray.splice(index, 1);
        onChange({
            ...data,
            [section]: newArray,
        });
    };

    // Removed handleSkillsChange as hardSkills and softSkills are handled separately

    const handleTailorCV = async () => {
        if (!data.targetJob.description) {
            alert("Please enter a job description first.");
            return;
        }

        setIsTailoring(true);
        try {
            const response = await fetch(API_ENDPOINTS.tailorCV, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cvData: data }),
            });

            if (!response.ok) throw new Error("Failed to tailor CV");

            const tailoredData = await response.json();

            // Update state with tailored data
            const newExperience = data.experience.map((exp) => {
                const tailoredExp = tailoredData.experience.find((e: any) => e.id === exp.id);
                return tailoredExp ? { ...exp, description: tailoredExp.description } : exp;
            });

            onChange({
                ...data,
                personalInfo: {
                    ...data.personalInfo,
                    summary: tailoredData.summary,
                },
                experience: newExperience,
                hardSkills: tailoredData.hardSkills || data.hardSkills, // Update hard skills
                softSkills: tailoredData.softSkills || data.softSkills, // Update soft skills
            });
        } catch (error) {
            console.error(error);
            alert("Failed to tailor CV. Please try again or check your connection.");
        } finally {
            setIsTailoring(false);
        }
    };

    const handleGenerateSummary = async () => {
        setIsGeneratingSummary(true);
        try {
            const response = await fetch(API_ENDPOINTS.generateSummary, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cvData: data,
                    jobDescription: data.targetJob.description
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate summary");
            }

            const { summary } = await response.json();
            handleChange("personalInfo", "summary", summary);
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert(`Failed to generate summary: ${error instanceof Error ? error.message : "Please try again"}`);
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const handleEnhanceExperience = async (index: number) => {
        const exp = data.experience[index];
        if (!exp.company || !exp.position || !exp.description) {
            alert("Please fill in Company, Position, and Description first.");
            return;
        }

        setEnhancingExperienceId(exp.id);
        try {
            const response = await fetch(API_ENDPOINTS.enhanceExperience, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    company: exp.company,
                    position: exp.position,
                    description: exp.description,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to enhance experience");
            }

            const { enhancedDescription } = await response.json();
            handleArrayChange("experience", index, "description", enhancedDescription);
        } catch (error) {
            console.error("Error enhancing experience:", error);
            alert("Failed to enhance experience. Please try again.");
        } finally {
            setEnhancingExperienceId(null);
        }
    };

    const handleLinkedInImport = (experience: Experience[]) => {
        onChange({
            ...data,
            experience: [...data.experience, ...experience],
        });
    };

    return (
        <div className="space-y-8">
            {/* Personal Info */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-black">Personal Details</h3>
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isGeneratingSummary}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium disabled:opacity-50 transition-colors"
                    >
                        {isGeneratingSummary ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        Rewrite Summary with AI
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                        <input
                            type="text"
                            value={data.personalInfo.fullName}
                            onChange={(e) => handleChange("personalInfo", "fullName", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Professional Title</label>
                        <input
                            type="text"
                            value={data.personalInfo.professionalTitle || ""}
                            onChange={(e) => handleChange("personalInfo", "professionalTitle", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="Senior Software Engineer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Email</label>
                        <input
                            type="email"
                            value={data.personalInfo.email}
                            onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Phone</label>
                        <input
                            type="tel"
                            value={data.personalInfo.phone}
                            onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">LinkedIn URL</label>
                        <input
                            type="text"
                            value={data.personalInfo.linkedin}
                            onChange={(e) => handleChange("personalInfo", "linkedin", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Website / Portfolio</label>
                        <input
                            type="text"
                            value={data.personalInfo.website}
                            onChange={(e) => handleChange("personalInfo", "website", e.target.value)}
                            className="w-full p-2 border rounded text-black"
                            placeholder="johndoe.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black mb-1">Professional Summary</label>
                    <textarea
                        value={data.personalInfo.summary}
                        onChange={(e) => handleChange("personalInfo", "summary", e.target.value)}
                        className="w-full p-2 border rounded text-black h-24"
                        placeholder="Experienced software engineer with a passion for..."
                    />
                </div>
            </section>

            {/* Target Job */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-black">Target Job</h3>
                    <button
                        onClick={handleTailorCV}
                        disabled={isTailoring}
                        className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                        {isTailoring ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        Tailor with AI
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Target Company"
                        className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                        value={data.targetJob.company}
                        onChange={(e) => handleChange("targetJob", "company", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Target Position"
                        className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                        value={data.targetJob.position}
                        onChange={(e) => handleChange("targetJob", "position", e.target.value)}
                    />
                </div>
                <textarea
                    placeholder="Job Description (Paste here to help AI tailor your CV)"
                    className="p-2 border rounded w-full h-24 text-black placeholder:text-gray-600"
                    value={data.targetJob.description}
                    onChange={(e) => handleChange("targetJob", "description", e.target.value)}
                />
            </section>

            {/* Experience */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-black">Experience</h3>
                    <button
                        onClick={() => setShowLinkedInImport(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                        <Linkedin size={16} />
                        Import from LinkedIn
                    </button>
                </div>
                <button
                    onClick={() => addItem("experience")}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                    <Plus size={16} /> Add Experience
                </button>
                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded bg-gray-50 space-y-3 relative">
                        <button
                            onClick={() => removeItem("experience", index)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Company"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={exp.company}
                                onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={exp.position}
                                onChange={(e) => handleArrayChange("experience", index, "position", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Start Date"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={exp.startDate}
                                onChange={(e) => handleArrayChange("experience", index, "startDate", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="End Date"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={exp.endDate}
                                onChange={(e) => handleArrayChange("experience", index, "endDate", e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Description"
                                className="p-2 border rounded w-full h-32 text-black placeholder:text-gray-600"
                                value={exp.description}
                                onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)}
                            />
                            <button
                                onClick={() => handleEnhanceExperience(index)}
                                disabled={enhancingExperienceId === exp.id}
                                className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 disabled:opacity-50 transition-colors"
                                title="Enhance description with AI"
                            >
                                {enhancingExperienceId === exp.id ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Wand2 size={12} />
                                )}
                                Enhance with AI
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-black">Education</h3>
                    <button
                        onClick={() => addItem("education")}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={16} /> Add Education
                    </button>
                </div>
                {data.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded bg-gray-50 space-y-3 relative">
                        <button
                            onClick={() => removeItem("education", index)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="School"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={edu.school}
                                onChange={(e) => handleArrayChange("education", index, "school", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Degree"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={edu.degree}
                                onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Start Date"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={edu.startDate}
                                onChange={(e) => handleArrayChange("education", index, "startDate", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="End Date"
                                className="p-2 border rounded w-full text-black placeholder:text-gray-600"
                                value={edu.endDate}
                                onChange={(e) => handleArrayChange("education", index, "endDate", e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Skills */}
            <section className="space-y-4">
                <h3 className="text-lg font-medium text-black">Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Hard / Technical Skills (comma separated)
                        </label>
                        <textarea
                            value={data.hardSkills?.join(", ") || ""}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    hardSkills: e.target.value.split(",").map((s) => s.trim()),
                                })
                            }
                            className="w-full p-2 border rounded text-black h-24"
                            placeholder="React, TypeScript, Node.js, AWS..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Soft Skills (comma separated)
                        </label>
                        <textarea
                            value={data.softSkills?.join(", ") || ""}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    softSkills: e.target.value.split(",").map((s) => s.trim()),
                                })
                            }
                            className="w-full p-2 border rounded text-black h-24"
                            placeholder="Leadership, Communication, Problem Solving..."
                        />
                    </div>
                </div>
            </section>

            {showLinkedInImport && (
                <LinkedInImport
                    onImport={handleLinkedInImport}
                    onClose={() => setShowLinkedInImport(false)}
                />
            )}
        </div>
    );
}
