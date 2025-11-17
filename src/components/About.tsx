import React from 'react';
import { Users, BookOpen } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const About: React.FC = () => {
  const highlights = [
    {
      icon: BookOpen,
      title: 'BSc in Statistics',
      description: 'Assam University, 2022',
    },
    {
      icon: Users,
      title: 'Core competencies',
      description: 'ML, NLP, Dashboards & EDA',
    },
    {
      icon: Users,
      title: 'Leadership',
      description: 'Team Karimganj lead since 2022',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#0F1720]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Professional Summary */}
          <div>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                I’m Deborshi Dey — a data scientist with a background in statistics and {siteConfig.experienceYears} of experience across open-source intelligence (OSINT) and misinformation screening, transitioning into broader ML, NLP, and analytics.
              </p>
              <p className="text-lg leading-relaxed">
                I focus on reproducible project work, multilingual signal analysis, and clear visual communication through dashboards and interactive charts.
              </p>
              <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">OSINT & Misinformation Skills</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-300">
                  <li>Signal triage and source validation</li>
                  <li>Multilingual screening (Hindi, English, Bengali, Assamese, Spanish)</li>
                  <li>Entity/sentiment extraction pipelines</li>
                  <li>Geo-intelligence and contextual analysis</li>
                  <li>Reproducible workflows and documentation</li>
                  <li>Dashboarding for decision support</li>
                </ul>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <highlight.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Photo Placeholder */}
          {/* Removed duplicate photo to keep hero as main profile visual */}
          <div className="hidden" />
        </div>

        {/* Domain Expertise */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Domain Expertise</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Machine Learning</h4>
              <p className="text-gray-300">Predictive modeling, classification, clustering, and deep learning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Data Analytics</h4>
              <p className="text-gray-300">Statistical analysis, A/B testing, and business intelligence</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Data Visualization</h4>
              <p className="text-gray-300">Interactive dashboards, charts, and compelling data stories</p>
            </div>
            {/* OSINT tile removed to avoid repetition with detailed skills block above */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;