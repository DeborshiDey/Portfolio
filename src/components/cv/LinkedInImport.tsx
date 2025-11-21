import { useState } from "react";
import { Loader2, Upload, Linkedin } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/cv/api-config";

interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

interface LinkedInImportProps {
    onImport: (experience: Experience[]) => void;
    onClose: () => void;
}

export default function LinkedInImport({ onImport, onClose }: LinkedInImportProps) {
    const [linkedInText, setLinkedInText] = useState("");
    const [isParsing, setIsParsing] = useState(false);
    const [preview, setPreview] = useState<Experience[] | null>(null);

    const handleParse = async () => {
        if (!linkedInText.trim()) {
            alert("Please paste your LinkedIn experience section first.");
            return;
        }

        setIsParsing(true);
        try {
            const response = await fetch(API_ENDPOINTS.parseLinkedIn, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ linkedInText }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to parse LinkedIn data");
            }

            const data = await response.json();
            setPreview(data.experience);
        } catch (error) {
            console.error("Parse error:", error);
            alert(`Failed to parse: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsParsing(false);
        }
    };

    const handleImport = () => {
        if (preview) {
            onImport(preview);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Linkedin className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-black">Import from LinkedIn</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>How to use:</strong>
                            </p>
                            <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                                <li>Go to your LinkedIn profile</li>
                                <li>Scroll to the "Experience" section</li>
                                <li>Select and copy all your experience entries</li>
                                <li>Paste the text below</li>
                            </ol>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                LinkedIn Experience Text
                            </label>
                            <textarea
                                value={linkedInText}
                                onChange={(e) => setLinkedInText(e.target.value)}
                                placeholder="Paste your LinkedIn experience section here..."
                                className="w-full h-48 p-3 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {!preview ? (
                            <button
                                onClick={handleParse}
                                disabled={isParsing || !linkedInText.trim()}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                            >
                                {isParsing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Parsing with AI...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5" />
                                        Parse Experience
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <h3 className="font-semibold text-black mb-3">Preview ({preview.length} entries)</h3>
                                    <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {preview.map((exp) => (
                                            <div key={exp.id} className="bg-white p-3 rounded border border-gray-200">
                                                <div className="font-medium text-black">{exp.position}</div>
                                                <div className="text-sm text-gray-700">{exp.company}</div>
                                                <div className="text-xs text-gray-600">
                                                    {exp.startDate} - {exp.endDate}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setPreview(null);
                                            setLinkedInText("");
                                        }}
                                        className="flex-1 bg-gray-200 text-black py-3 px-4 rounded-lg hover:bg-gray-300 font-medium"
                                    >
                                        Start Over
                                    </button>
                                    <button
                                        onClick={handleImport}
                                        className="flex-1 bg-green-600text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                                    >
                                        Import to CV
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
