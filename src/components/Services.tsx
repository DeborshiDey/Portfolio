import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Data Science Consulting',
      bullets: ['Problem framing', 'Data pipelines', 'Model development', 'Deployment'],
      timeline: '2–8 week sprint',
      deliverables: ['Reports', 'Dashboards', 'Models', 'Documentation'],
    },
    {
      title: 'Machine Learning Solutions',
      bullets: ['Prototyping', 'Model selection', 'Evaluation', 'Productionization'],
      timeline: '3–6 weeks',
      deliverables: ['Model card', 'Evaluation report', 'Deployment plan'],
    },
    {
      title: 'NLP Solutions',
      bullets: ['Text preprocessing', 'Sentiment & entity extraction', 'Topic modelling', 'Custom pipelines'],
      timeline: '2–5 weeks',
      deliverables: ['Reusable pipeline', 'API or notebook', 'Evaluation metrics'],
    },
    {
      title: 'Data Analysis & Dashboards',
      bullets: ['EDA', 'Visual storytelling', 'Power BI', 'SQL-based analytics'],
      timeline: '2–4 weeks',
      deliverables: ['Interactive dashboard', 'SQL scripts', 'Insights summary'],
    },
    {
      title: 'Technical Leadership & Training',
      bullets: ['Mentoring teams', 'Review cycles', 'Project governance'],
      timeline: 'Ongoing or 2–8 week bootcamps',
      deliverables: ['Training materials', 'Playbooks', 'Review reports'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#0F1720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Services</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Practical engagements focused on ML, NLP, analytics, and reproducible delivery
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <ul className="space-y-1 mb-4">
                {s.bullets.map((b, idx) => (
                  <li key={idx} className="text-sm text-gray-300">• {b}</li>
                ))}
              </ul>
              <div className="text-sm text-gray-300 mb-2">Timeline: {s.timeline}</div>
              <div className="text-sm text-gray-300">Deliverables: {s.deliverables.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;