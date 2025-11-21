"use client";

import React from "react";
import { CVData } from "@/lib/cv/types";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFDocument from "./PDFDocument";
import { generateDOC } from "@/lib/cv/generateDOC";
import { getTemplate, Template } from "@/lib/cv/templates";

interface CVPreviewProps {
    data: CVData;
}

export default function CVPreview({ data }: CVPreviewProps) {
    const template = getTemplate(data.selectedTemplate);

    const handleDownloadPDF = async () => {
        const blob = await pdf(<PDFDocument data={data} />).toBlob();
        saveAs(blob, `${data.personalInfo.fullName || "cv"}.pdf`);
    };

    const handleDownloadDOC = async () => {
        const blob = await generateDOC(data);
        saveAs(blob, `${data.personalInfo.fullName || "cv"}.docx`);
    };

    const renderLayout = () => {
        switch (template.layout) {
            case "sidebar":
                return <SidebarLayout data={data} template={template} />;
            case "left-header":
                return <SideHeaderLayout data={data} template={template} />;
            case "standard":
            default:
                return <StandardLayout data={data} template={template} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end gap-2">
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    <Download size={16} /> Download PDF
                </button>
                <button
                    onClick={handleDownloadDOC}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                    <Download size={16} /> Download DOC
                </button>
            </div>

            <div className="border rounded-lg bg-white shadow-sm min-h-[800px] font-sans text-black overflow-hidden" id="cv-preview">
                {renderLayout()}
            </div>
        </div>
    );
}

// --- Layout Components ---

const StandardLayout = ({ data, template }: { data: CVData; template: Template }) => (
    <>
        {/* Header */}
        <header
            className="border-b pb-4 mb-6 p-8"
            style={{
                backgroundColor: template.colors.headerBackground || "transparent",
                borderColor: template.colors.primary,
                color: template.colors.headerText || template.colors.text,
            }}
        >
            <h1 className="text-3xl font-bold uppercase tracking-wide" style={{ color: template.colors.headerText || template.colors.primary }}>
                {data.personalInfo.fullName || "Your Name"}
            </h1>
            {data.personalInfo.professionalTitle && (
                <p className="text-xl opacity-90 mb-2" style={{ color: template.colors.headerText ? template.colors.headerText : template.colors.secondary }}>
                    {data.personalInfo.professionalTitle}
                </p>
            )}
            <div className="flex flex-wrap gap-3 text-sm mt-2" style={{ color: template.colors.headerText ? template.colors.headerText : template.colors.secondary }}>
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
            </div>
        </header>

        <div className="px-8 pb-8 space-y-6">
            <SummarySection data={data} template={template} />
            <ExperienceSection data={data} template={template} />
            <EducationSection data={data} template={template} />
            <SkillsSection data={data} template={template} />
        </div>
    </>
);

const SidebarLayout = ({ data, template }: { data: CVData; template: Template }) => (
    <div className="flex min-h-[800px]">
        {/* Sidebar */}
        <div
            className="w-1/3 p-6 space-y-6 text-white"
            style={{ backgroundColor: template.colors.headerBackground || template.colors.primary }}
        >
            <div className="text-center mb-6">
                {/* Placeholder for Photo if we had one */}
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                    {data.personalInfo.fullName ? data.personalInfo.fullName.charAt(0) : "U"}
                </div>
                <h1 className="text-2xl font-bold uppercase leading-tight mb-2">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                {data.personalInfo.professionalTitle && (
                    <p className="text-sm opacity-90">{data.personalInfo.professionalTitle}</p>
                )}
            </div>

            <div className="space-y-2 text-sm opacity-90">
                {data.personalInfo.email && <div className="break-words">{data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.linkedin && <div className="break-words">{data.personalInfo.linkedin}</div>}
                {data.personalInfo.website && <div className="break-words">{data.personalInfo.website}</div>}
            </div>

            {/* Skills in Sidebar */}
            <div className="pt-4 border-t border-white/20">
                <h3 className="font-bold uppercase mb-3 text-sm tracking-wider">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {[...(data.hardSkills || []), ...(data.softSkills || []), ...(data.skills || [])].map((skill, i) => (
                        <span key={i} className="bg-white/20 px-2 py-1 rounded text-xs">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8 space-y-6 bg-white">
            <SummarySection data={data} template={template} />
            <ExperienceSection data={data} template={template} />
            <EducationSection data={data} template={template} />
        </div>
    </div>
);

const SideHeaderLayout = ({ data, template }: { data: CVData; template: Template }) => (
    <div className="p-8">
        {/* Header */}
        <header className="mb-8 border-b pb-6" style={{ borderColor: template.colors.primary }}>
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: template.colors.primary }}>
                {data.personalInfo.fullName || "Your Name"}
            </h1>
            {data.personalInfo.professionalTitle && (
                <p className="text-xl text-gray-600 mb-4">{data.personalInfo.professionalTitle}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
            </div>
        </header>

        <div className="space-y-8">
            {data.personalInfo.summary && (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h3 className="font-bold uppercase text-sm tracking-wider" style={{ color: template.colors.primary }}>
                            Profile
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <p className="text-sm leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
                    </div>
                </div>
            )}

            {data.experience.length > 0 && (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h3 className="font-bold uppercase text-sm tracking-wider" style={{ color: template.colors.primary }}>
                            Experience
                        </h3>
                    </div>
                    <div className="col-span-9 space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {exp.startDate} - {exp.endDate || "Present"}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.education.length > 0 && (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h3 className="font-bold uppercase text-sm tracking-wider" style={{ color: template.colors.primary }}>
                            Education
                        </h3>
                    </div>
                    <div className="col-span-9 space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900">{edu.school}</h4>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {edu.startDate} - {edu.endDate || "Present"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(data.hardSkills?.length > 0 || data.softSkills?.length > 0 || data.skills?.length > 0) && (
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h3 className="font-bold uppercase text-sm tracking-wider" style={{ color: template.colors.primary }}>
                            Skills
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <div className="flex flex-wrap gap-2">
                            {[...(data.hardSkills || []), ...(data.softSkills || []), ...(data.skills || [])].map((skill, i) => (
                                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

// --- Shared Sections ---

const SummarySection = ({ data, template }: { data: CVData; template: Template }) => {
    if (!data.personalInfo.summary) return null;
    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-3" style={{ color: template.colors.primary, borderColor: template.colors.primary }}>
                Professional Summary
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{data.personalInfo.summary}</p>
        </section>
    );
};

const ExperienceSection = ({ data, template }: { data: CVData; template: Template }) => {
    if (data.experience.length === 0) return null;
    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-3" style={{ color: template.colors.primary, borderColor: template.colors.primary }}>
                Experience
            </h2>
            <div className="space-y-4">
                {data.experience.map((exp) => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-black">{exp.position}</h3>
                            <span className="text-sm text-black">
                                {exp.startDate} - {exp.endDate || "Present"}
                            </span>
                        </div>
                        <div className="text-sm font-semibold text-black mb-1">{exp.company}</div>
                        <p className="text-sm whitespace-pre-line">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const EducationSection = ({ data, template }: { data: CVData; template: Template }) => {
    if (data.education.length === 0) return null;
    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-3" style={{ color: template.colors.primary, borderColor: template.colors.primary }}>
                Education
            </h2>
            <div className="space-y-3">
                {data.education.map((edu) => (
                    <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-black">{edu.school}</h3>
                            <span className="text-sm text-black">
                                {edu.startDate} - {edu.endDate || "Present"}
                            </span>
                        </div>
                        <div className="text-sm">{edu.degree}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SkillsSection = ({ data, template }: { data: CVData; template: Template }) => {
    const hasSkills = data.hardSkills?.length || data.softSkills?.length || data.skills?.length;
    if (!hasSkills) return null;

    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-3" style={{ color: template.colors.primary, borderColor: template.colors.primary }}>
                Skills
            </h2>

            {data.hardSkills && data.hardSkills.length > 0 && (
                <div className="mb-3">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.hardSkills.map((skill, index) => (
                            <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {data.softSkills && data.softSkills.length > 0 && (
                <div className="mb-3">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.softSkills.map((skill, index) => (
                            <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Fallback */}
            {(!data.hardSkills?.length && !data.softSkills?.length && data.skills?.length > 0) && (
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};
