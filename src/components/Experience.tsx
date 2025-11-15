import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Team Leader — Data Science & Misinformation',
      company: 'Team Karimganj',
      location: '',
      period: '2022 – Present',
      description: 'Leading a data team focused on open-source intelligence (OSINT), misinformation screening, and applied ML/NLP analytics.',
      achievements: [
        'Designed reproducible workflows for misinformation screening and geo-intelligence',
        'Led cross-functional initiatives delivering dashboards and ML/NLP insights',
        'Mentored analysts and established review cycles and data governance'
      ]
    },
    {
      title: 'Analyst — Data Science & Misinformation',
      company: 'Team Karimganj',
      location: '',
      period: '2021 – 2022',
      description: 'Conducted data analysis, reporting, and signal triage across multilingual sources; contributed to early ML/NLP prototypes.',
      achievements: [
        'Built EDA reports and visual summaries for decision-makers',
        'Maintained data pipelines and documentation for reproducibility',
        'Collaborated on sentiment and entity extraction workflows'
      ]
    }
  ];

  const education = [
    {
      degree: 'BSc in Statistics',
      institution: 'Assam University',
      location: 'Assam, India',
      period: '2018 – 2022',
      gpa: undefined,
      honors: undefined,
    }
  ];

  const certifications = [
    {
      name: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-DE-2023-12345'
    },
    {
      name: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      date: '2022',
      credentialId: 'AWS-ML-2022-67890'
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'Coursera (Stanford University)',
      date: '2021',
      credentialId: 'Coursera-DL-2021-54321'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#0F1720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
        </div>

        {/* Professional Experience */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Briefcase className="h-6 w-6 mr-3 text-cyan-500" />
            Professional Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-white/10 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 rounded-full -translate-x-2"></div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                      <p className="text-lg text-cyan-400 font-semibold">{exp.company}</p>
                      {exp.location && (
                        <div className="flex items-center text-gray-300 text-sm mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-white">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <GraduationCap className="h-6 w-6 mr-3 text-cyan-500" />
            Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-white/10 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 rounded-full -translate-x-2"></div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-lg text-cyan-400 font-semibold">{edu.institution}</p>
                      <div className="flex items-center text-gray-300 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {edu.location}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {edu.period}
                    </div>
                  </div>
                  {(edu.gpa || edu.honors) && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {edu.gpa && (
                        <span className="bg-white/10 px-3 py-1 rounded-full text-white">
                          GPA: {edu.gpa}
                        </span>
                      )}
                      {edu.honors && (
                        <span className="bg-white/10 px-3 py-1 rounded-full text-white">
                          {edu.honors}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Experience;