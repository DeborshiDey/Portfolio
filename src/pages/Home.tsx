import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
// Services removed per request
import Resume from '@/components/Resume';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1720] text-gray-100">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Resume />
      <Contact />
    </div>
  );
}