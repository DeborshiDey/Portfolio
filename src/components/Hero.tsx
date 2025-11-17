import React from 'react';
import { ArrowDown, Github, Linkedin, Calendar, Briefcase, MapPin, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#0F1720] to-[#0b1220] pt-16 scroll-mt-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-center">
            <img
              src={siteConfig.photoUrl}
              alt={`${siteConfig.name} profile photo`}
              className="w-60 h-60 rounded-full object-cover shadow-xl ring-4 ring-white/10 md:ml-10"
              loading="lazy"
            />
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white text-center">Deborshi Dey</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 text-center">
              <span className="block">Data Science | ML &amp; NLP</span>
              <span className="block">Minfo and Geopolitical Risk Analyst</span>
            </h2>
          </div>

          <div className="text-center md:text-left">
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Experience</div>
                    <div className="text-sm font-semibold text-white">{siteConfig.experienceYears}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Current Role</div>
                    <div className="text-sm font-semibold text-white">{siteConfig.currentRoleSummary}</div>
                  </div>
                </div>
              </div>
              {siteConfig.location && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Location</div>
                      <div className="text-sm font-semibold text-white">{siteConfig.location}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Languages</div>
                    <div className="text-sm font-semibold text-white">{siteConfig.languages.join(' • ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards removed to avoid duplication with About domain expertise */}

        <div className="flex justify-center space-x-6 mt-8">
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

        <div className="animate-bounce mt-6 flex justify-center">
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