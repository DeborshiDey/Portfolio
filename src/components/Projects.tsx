import React from 'react';
import { ExternalLink, Github, BarChart3, TrendingUp, Users } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Customer Churn Prediction',
      description: 'Developed a machine learning model to predict customer churn with 89% accuracy, helping reduce churn rate by 15%.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
      results: {
        accuracy: '89%',
        impact: '15% reduction in churn',
        users: '10K+ customers analyzed'
      }
    },
    {
      title: 'Real Estate Price Prediction',
      description: 'Built a comprehensive real estate valuation model using ensemble methods, achieving 92% prediction accuracy.',
      technologies: ['Python', 'Random Forest', 'Linear Regression', 'Plotly'],
      results: {
        accuracy: '92%',
        impact: '$2M+ in property value assessed',
        users: '500+ investors'
      }
    },
    {
      title: 'Sentiment Analysis System',
      description: 'Created an NLP-based sentiment analysis system to analyze customer reviews with real-time insights.',
      technologies: ['Python', 'NLTK', 'TextBlob', 'BERT'],
      results: {
        accuracy: '87%',
        impact: '30% improvement in satisfaction',
        users: '50K+ reviews processed'
      }
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of data science projects demonstrating expertise in machine learning and data visualization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-12 w-12 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-2" />
                    <span className="text-gray-600">Accuracy: {project.results.accuracy}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-3 w-3 text-blue-500 mr-2" />
                    <span className="text-gray-600">Impact: {project.results.impact}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 text-purple-500 mr-2" />
                    <span className="text-gray-600">{project.results.users}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <a
                  href={(project as any).liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label={`Open live demo for ${project.title}`}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Demo
                </a>
                <a
                  href={(project as any).github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
                  aria-label={`Open GitHub repository for ${project.title}`}
                >
                  <Github className="h-3 w-3 mr-1" />
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;