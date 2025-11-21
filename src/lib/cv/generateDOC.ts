import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { CVData } from "./types";

export const generateDOC = async (data: CVData): Promise<Blob> => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        text: data.personalInfo.fullName.toUpperCase(),
                        heading: HeadingLevel.TITLE,
                        alignment: AlignmentType.LEFT,
                        spacing: { after: 100 },
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({ text: data.personalInfo.email || "" }),
                            new TextRun({ text: data.personalInfo.phone ? ` • ${data.personalInfo.phone}` : "" }),
                            new TextRun({ text: data.personalInfo.linkedin ? ` • ${data.personalInfo.linkedin}` : "" }),
                            new TextRun({ text: data.personalInfo.website ? ` • ${data.personalInfo.website}` : "" }),
                        ],
                        spacing: { after: 300 },
                        border: {
                            bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 },
                        },
                    }),

                    // Summary
                    ...(data.personalInfo.summary
                        ? [
                            new Paragraph({
                                text: "PROFESSIONAL SUMMARY",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 200, after: 100 },
                                border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                            }),
                            new Paragraph({
                                text: data.personalInfo.summary,
                                spacing: { after: 200 },
                            }),
                        ]
                        : []),

                    // Experience
                    ...(data.experience.length > 0
                        ? [
                            new Paragraph({
                                text: "EXPERIENCE",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 200, after: 100 },
                                border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                            }),
                            ...data.experience.flatMap((exp) => [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: exp.position, bold: true, size: 24 }),
                                        new TextRun({
                                            text: `\t${exp.startDate} - ${exp.endDate || "Present"}`,
                                            size: 20,
                                        }),
                                    ],
                                    tabStops: [{ type: "right", position: 9000 }], // Adjust tab position as needed
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: exp.company,
                                            italics: true,
                                        }),
                                    ],
                                    spacing: { after: 50 },
                                }),
                                new Paragraph({
                                    text: exp.description,
                                    spacing: { after: 200 },
                                }),
                            ]),
                        ]
                        : []),

                    // Education
                    ...(data.education.length > 0
                        ? [
                            new Paragraph({
                                text: "EDUCATION",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 200, after: 100 },
                                border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                            }),
                            ...data.education.flatMap((edu) => [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: edu.school, bold: true, size: 24 }),
                                        new TextRun({
                                            text: `\t${edu.startDate} - ${edu.endDate || "Present"}`,
                                            size: 20,
                                        }),
                                    ],
                                    tabStops: [{ type: "right", position: 9000 }],
                                }),
                                new Paragraph({
                                    text: edu.degree,
                                    spacing: { after: 200 },
                                }),
                            ]),
                        ]
                        : []),

                    // Skills
                    ...(data.skills.length > 0
                        ? [
                            new Paragraph({
                                text: "SKILLS",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 200, after: 100 },
                                border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                            }),
                            new Paragraph({
                                text: data.skills.join(", "),
                                spacing: { after: 200 },
                            }),
                        ]
                        : []),
                ],
            },
        ],
    });

    return Packer.toBlob(doc);
};
