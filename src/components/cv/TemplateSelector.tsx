import React from "react";
import { Check } from "lucide-react";
import { templates, TemplateId } from "@/lib/cv/templates";

interface TemplateSelectorProps {
    selectedTemplate: TemplateId;
    onSelect: (templateId: TemplateId) => void;
}

export default function TemplateSelector({
    selectedTemplate,
    onSelect,
}: TemplateSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Choose Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template) => {
                    const isSelected = selectedTemplate === template.id;
                    return (
                        <button
                            key={template.id}
                            onClick={() => onSelect(template.id)}
                            className={`relative p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${isSelected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                                    <Check size={16} />
                                </div>
                            )}
                            <div className="space-y-2">
                                <h4 className="font-bold text-black">{template.name}</h4>
                                <p className="text-sm text-gray-600">{template.description}</p>
                                <div className="flex gap-2 mt-3">
                                    <div
                                        className="w-6 h-6 rounded border"
                                        style={{ backgroundColor: template.colors.primary }}
                                        title="Primary color"
                                    />
                                    <div
                                        className="w-6 h-6 rounded border"
                                        style={{ backgroundColor: template.colors.secondary }}
                                        title="Secondary color"
                                    />
                                    {template.colors.accent && (
                                        <div
                                            className="w-6 h-6 rounded border"
                                            style={{ backgroundColor: template.colors.accent }}
                                            title="Accent color"
                                        />
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
