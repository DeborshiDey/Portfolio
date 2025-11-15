import React from 'react';
import { Code, Database, Brain, BarChart3, CheckCircle } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Python', level: 95, color: 'bg-blue-500' },
        { name: 'R', level: 85, color: 'bg-green-500' },
        { name: 'SQL', level: 90, color: 'bg-orange-500' },
        { name: 'JavaScript', level: 75, color: 'bg-yellow-500' }
      ]
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      skills: [
        { name: 'Scikit-learn', level: 90, color: 'bg-blue-600' },
        { name: 'TensorFlow', level: 80, color: 'bg-orange-600' },
        { name: 'PyTorch', level: 75, color: 'bg-red-500' },
        { name: 'Keras', level: 85, color: 'bg-purple-500' }
      ]
    },
    {
      title: 'Data Analysis & Visualization',
      icon: BarChart3,
      skills: [
        { name: 'Pandas', level: 95, color: 'bg-green-600' },
        { name: 'NumPy', level: 90, color: 'bg-blue-700' },
        { name: 'Matplotlib', level: 85, color: 'bg-red-600' },
        { name: 'Tableau', level: 80, color: 'bg-blue-400' }
      ]
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 85, color: 'bg-blue-800' },
        { name: 'MongoDB', level: 75, color: 'bg-green-700' },
        { name: 'Jupyter', level: 95, color: 'bg-orange-700' },
        { name: 'Git', level: 80, color: 'bg-gray-700' }
      ]
    }
  ];

  const additionalSkills = [
    'Statistical Analysis',
    'A/B Testing',
    'Time Series Analysis',
    'Natural Language Processing',
    'Computer Vision',
    'Deep Learning',
    'Data Mining',
    'Feature Engineering',
    'Model Deployment',
    'Cloud Computing (AWS)',
    'Docker',
    'Apache Spark'
  ];

  const SkillBar: React.FC<{ skill: { name: string; level: number; color: string } }> = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
        <span className="text-sm text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-[#0F1720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise in data science tools, programming languages, and machine learning frameworks
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <category.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Skills;