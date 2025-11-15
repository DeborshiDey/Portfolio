import React from 'react';
import { siteConfig } from '@/lib/siteConfig';

const Resume: React.FC = () => {
  const skills = {
    languages: ['Python', 'SQL'],
    tools: ['Power BI', 'Jupyter', 'Git', 'Docker'],
    techniques: ['Supervised learning', 'Time series forecasting', 'NLP', 'EDA', 'Data visualization'],
  };

  return (
    <section id="resume" className="py-20 bg-[#0F1720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Resume & Downloads</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Quick view of technical strengths and resources</p>
          <div className="mt-6">
            <a href={siteConfig.resumeUrl} download className="inline-flex items-center px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg">
              Download Résumé (PDF)
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Techniques</h3>
            <div className="flex flex-wrap gap-2">
              {skills.techniques.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20">
            Languages: {siteConfig.languages.join(' • ')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;