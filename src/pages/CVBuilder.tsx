import React, { useState } from 'react';
import { CVData, initialCVData } from '@/lib/cv/types';
import CVForm from '@/components/cv/CVForm';
import CVPreview from '@/components/cv/CVPreview';
import TemplateSelector from '@/components/cv/TemplateSelector';
import { TemplateId } from '@/lib/cv/templates';
import Header from '@/components/Header';

const CVBuilder: React.FC = () => {
    const [cvData, setCvData] = useState<CVData>(initialCVData);

    return (
        <div className="min-h-screen bg-[#0F1720] text-white">
            <Header />

            <main className="pt-24 pb-16 px-6">
                <header className="mb-8 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        CV Builder
                    </h1>
                    <p className="text-gray-400">Create your ATS-friendly CV in minutes</p>
                </header>

                <div className="max-w-7xl mx-auto mb-8">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <TemplateSelector
                            selectedTemplate={cvData.selectedTemplate}
                            onSelect={(templateId: TemplateId) =>
                                setCvData({ ...cvData, selectedTemplate: templateId })
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-fit">
                        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                        <CVForm data={cvData} onChange={setCvData} />
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-fit sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                        <CVPreview data={cvData} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CVBuilder;
