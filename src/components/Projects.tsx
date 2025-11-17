import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Tag, Layers } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

type Project = {
  title: string;
  subtitle: string;
  shortDescription: string;
  coverImg: string;
  details: {
    context: string;
    goal: string;
    contribution: string[];
    results: string[];
    conclusion: string;
    technologies: string[];
    tags: string[];
  };
  links: {
    github?: string;
    demo?: string;
  };
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-40 w-full bg-gray-100">
        {imgError ? (
          <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Layers className="h-10 w-10 text-blue-600" />
          </div>
        ) : (
          <img
            src={project.coverImg}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        <p className="text-sm text-blue-700 mt-1">{project.subtitle}</p>
        <p className="text-gray-700 mt-3 text-sm leading-relaxed">{project.shortDescription}</p>
        <div className="mt-4 flex gap-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" /> View Notebook
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github className="h-4 w-4 mr-1" /> GitHub
            </a>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          aria-expanded={open}
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {open ? 'Hide Details' : 'View Details'}
        </button>
        {open && (
          <div className="mt-6 space-y-5">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Context</h4>
              <p className="text-gray-700 text-sm leading-relaxed mt-1">{project.details.context}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Goal</h4>
              <p className="text-gray-700 text-sm leading-relaxed mt-1">{project.details.goal}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">My Contribution</h4>
              <ul className="text-gray-700 text-sm leading-relaxed mt-1 space-y-1 list-disc pl-5">
                {project.details.contribution.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Results</h4>
              <ul className="text-gray-700 text-sm leading-relaxed mt-1 space-y-1 list-disc pl-5">
                {project.details.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Conclusion</h4>
              <p className="text-gray-700 text-sm leading-relaxed mt-1">{project.details.conclusion}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Technologies</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.details.technologies.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Tag className="h-4 w-4" /> Tags</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.details.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Indian Stock Market Prediction with NLP & ML',
      subtitle: 'Combining Financial News Sentiment with Time-Series Models for NSE/BSE Price Forecasting',
      shortDescription:
        'Built ML pipeline ingesting financial news with NLP sentiment analysis and time-series models (LSTM, XGBoost) to forecast Indian stock prices. Achieved 15% accuracy improvement, AUC 0.82.',
      coverImg: '/images/project-stock-cover.png',
      details: {
        context:
          'The Indian stock market (NSE/BSE) sees volatility driven by macro events and market sentiment. Traditional time-series models miss sentiment signals embedded in financial news.',
        goal:
          'Combine NLP sentiment from financial news with time-series forecasting to predict price movements within 1–5 days, improving accuracy by ≥15% over baseline.',
        contribution: [
          'Ingested financial news and OHLCV, engineered 50+ features (sentiment embeddings, technical indicators, lags, microstructure signals)',
          'Built sentiment pipeline using NLTK and spaCy; created embedding vectors; handled multi-source ingestion',
          'Trained LSTM for temporal dependencies; XGBoost for ensembles; applied time-series CV with leakage prevention',
          'Performed feature selection via correlation and SHAP; applied regularization to stabilize performance',
          'Evaluated with direction accuracy, AUC, precision/recall, MAE; built visualizations and backtests across market regimes'
        ],
        results: [
          '15% accuracy improvement over baseline',
          'AUC-ROC: 0.82 for buy/sell signal discrimination',
          'MAE: ₹2.35 per share',
          'Precision: 78% | Recall: 72%',
          'Sentiment drift emerged as top predictor; validated on multiple NSE/BSE stocks'
        ],
        conclusion:
          'Integrating sentiment with technical and temporal signals improves short-horizon predictions and trading decision support; ongoing retraining and source curation sustain performance.',
        technologies: ['Python', 'TensorFlow/Keras (LSTM)', 'XGBoost', 'NLTK', 'spaCy', 'Pandas', 'NumPy', 'Scikit-learn', 'Plotly'],
        tags: ['NLP', 'Time Series', 'ML', 'Deep Learning', 'Finance']
      },
      links: {
        github: 'https://github.com/DeborshiDey',
        demo: '#'
      }
    },
    {
      title: 'Housing Price Prediction & Market Analysis',
      subtitle: 'Interpretable Regression Model with SHAP Explainability for Real Estate Valuation',
      shortDescription:
        "Developed interpretable ML model predicting housing prices with RMSE $45K and R² 0.89. Used SHAP to identify top drivers and explain decisions to stakeholders.",
      coverImg: '/images/project-housing-cover.png',
      details: {
        context:
          'Real estate valuation depends on location, property characteristics, economics and trends. Accuracy without interpretability limits adoption; both are needed.',
        goal:
          'Build an accurate, interpretable model achieving <$50K RMSE and clear explanations of top price drivers with stakeholder-friendly visuals.',
        contribution: [
          'Performed EDA on 50+ features; addressed missing values, outliers, multicollinearity',
          'Engineered geospatial, temporal and derived features (distance metrics, neighborhood indicators, price per sqft, interaction terms)',
          'Trained XGBoost, LightGBM, and GBR with CV; tuned hyperparameters and selected best model',
          'Applied SHAP for global importance and individual explanations; built waterfall and force plots',
          'Validated on holdout with multiple metrics; produced executive summaries with business context'
        ],
        results: [
          'RMSE: $45K on test set',
          'R²: 0.89 explained variance',
          'Top drivers: location, square footage, property age, temporal trend, condition',
          'Consistent performance across property types; clear stakeholder communication'
        ],
        conclusion:
          'Interpretability with SHAP bridges the gap between model performance and business trust, enabling actionable real estate valuations.',
        technologies: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
        tags: ['Regression', 'Explainability', 'Real Estate', 'SHAP', 'EDA']
      },
      links: {
        github: 'https://github.com/DeborshiDey',
        demo: '#'
      }
    },
    {
      title: 'Football Match Analysis & Outcome Modeling',
      subtitle: 'Event-level Analysis and Predictive Modeling for Match Outcomes',
      shortDescription:
        'Built event-level analytics and predictive models for match outcomes, with dashboards showing timelines, heatmaps, and key statistics for tactical insights.',
      coverImg: '/images/project-football-cover.png',
      details: {
        context:
          'Match outcomes are influenced by complex event sequences, formations and player interactions. Teams need actionable analytics beyond raw stats to inform decisions.',
        goal:
          'Create event-level analytics and outcome models with interpretable dashboards to support pre- and in-game decisions.',
        contribution: [
          'Aggregated event data (passes, shots, tackles) and built possession chains and phase-of-play features',
          'Engineered spatial features (zones, heatmaps) and temporal segments (periods, momentum)',
          'Trained classification models for win/draw/loss; calibrated probabilities; evaluated with proper game folds',
          'Built interactive dashboards with timelines, heatmaps and player impact summaries',
          'Summarized tactical insights and created reproducible notebooks'
        ],
        results: [
          'Improved outcome prediction vs baseline classifiers',
          'Clear visualization of momentum shifts and high-impact events',
          'Actionable player and formation insights for analysts'
        ],
        conclusion:
          'Event-centric analytics offer interpretable, tactical value and measurable predictive improvements for decision-making.',
        technologies: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'NumPy'],
        tags: ['Sports Analytics', 'Classification', 'Dashboard', 'EDA']
      },
      links: {
        github: 'https://github.com/DeborshiDey',
        demo: '#'
      }
    }
  ];

  return (
    <section id="projects" className="py-16 bg-white scroll-mt-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selected case studies demonstrating applied ML, NLP, and analytical rigor
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
        <div className="text-center mt-10">
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