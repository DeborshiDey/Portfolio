import React from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1720] to-[#0b1220] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="mb-8 md:mb-0 flex justify-center md:justify-start">
            <img
              src={siteConfig.photoUrl}
              alt={`${siteConfig.name} profile photo`}
              className="w-60 h-60 rounded-full object-cover shadow-xl ring-4 ring-white/10"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {siteConfig.headline}
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
              {siteConfig.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mb-8">
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-3 bg-transparent text-cyan-400 font-semibold rounded-lg border border-cyan-500 hover:bg-cyan-500/10 transition-colors shadow-lg"
              >
                Contact / Hire Me
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300">
                <span className="block font-semibold text-white">Experience</span>
                {siteConfig.experienceYears}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300">
                <span className="block font-semibold text-white">Current Role</span>
                {siteConfig.currentRoleSummary}
              </div>
              {siteConfig.location && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300">
                  <span className="block font-semibold text-white">Location</span>
                  {siteConfig.location}
                </div>
              )}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300">
                <span className="block font-semibold text-white">Languages</span>
                {siteConfig.languages.join(' • ')}
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards removed to avoid duplication with About domain expertise */}

        <div className="flex justify-center space-x-6 mt-12">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>

        <div className="animate-bounce mt-8 flex justify-center">
          <a
            href="#about"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;