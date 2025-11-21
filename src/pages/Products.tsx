import React from 'react';
import Header from '@/components/Header';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';

const Products: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0F1720] text-white selection:bg-cyan-500/30">
            <Header />

            <main className="pt-24 pb-16 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Products & Tools
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        A collection of tools and applications I've built to solve real-world problems.
                        Explore my latest work below.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CV Builder Product Card */}
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText className="w-24 h-24 text-cyan-400" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-6 h-6 text-cyan-400" />
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                CV Builder
                            </h3>

                            <p className="text-gray-400 text-sm mb-6 flex-grow">
                                Create professional, ATS-friendly resumes in minutes with AI-powered tailoring and multiple premium templates.
                            </p>

                            <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                Launch App <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </a>

                    {/* Coming Soon Placeholder */}
                    <div className="group relative bg-white/5 border border-white/5 rounded-2xl p-6 border-dashed">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center py-8">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Sparkles className="w-5 h-5 text-gray-500" />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-300 mb-2">
                                More Coming Soon
                            </h3>

                            <p className="text-gray-500 text-sm max-w-[200px]">
                                I'm constantly building new things. Check back later for more tools.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Products;
