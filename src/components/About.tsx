import React from 'react';
import { Users, BookOpen, Brain, BarChart3, MessageSquare, Search, CheckCircle } from 'lucide-react';
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
    <section id="about" className="py-18 bg-[#0F1720] scroll-mt-24">
      <div className="w-full px-6 md:px-10 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 mt-2">About</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 justify-items-stretch w-full">
          {/* Professional Summary */}
          <div>
            <div className="space-y-4 text-gray-300 text-center w-full">
              <p className="text-lg leading-relaxed">
                I’m Deborshi Dey — a data scientist with a background in statistics and {siteConfig.experienceYears} of experience across open-source intelligence (OSINT) and misinformation screening, transitioning into broader ML, NLP, and analytics.
              </p>
              <p className="text-lg leading-relaxed">
                I focus on reproducible project work, multilingual signal analysis, and clear visual communication through dashboards and interactive charts.
              </p>
              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">OSINT & Misinformation Skills</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Signal triage and source validation</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Multilingual screening (Hindi, English, Bengali, Assamese, Spanish)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Entity/sentiment extraction pipelines</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Geo-intelligence and contextual analysis</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Reproducible workflows and documentation</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" /> Dashboarding for decision support</li>
                </ul>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 justify-center mt-6 w-full">
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
          
        </div>

        {/* Core Skills */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 w-full">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Core Skills</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <Brain className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Machine Learning</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Supervised/unsupervised modeling</li>
                <li>Feature engineering & selection</li>
                <li>Model evaluation & tuning</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Data Science</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>EDA & statistical analysis</li>
                <li>Dashboards (Power BI)</li>
                <li>SQL-based analytics</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">NLP</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Text preprocessing & pipelines</li>
                <li>Sentiment & entity extraction</li>
                <li>Topic modeling</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">OSINT</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Source validation & triage</li>
                <li>Geo-intelligence context</li>
                <li>Reproducible workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;