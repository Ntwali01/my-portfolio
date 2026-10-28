import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { HowIWork } from '@/components/testimonials';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import GrainientBackground from '@/components/GrainientBackground';
import { AIReceptionist } from '@/components/ai-receptionist';

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />

      {/* Grainient background wraps About → Footer */}
      <div className="relative isolate">
        <GrainientBackground />
        {/* Solid cap + gradient fade to fully seal the hero/grainient boundary */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-10" style={{ background: 'oklch(0.08 0 0)' }} />
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10" style={{ height: '180px', background: 'linear-gradient(to bottom, oklch(0.08 0 0) 0%, transparent 100%)' }} />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <HowIWork />
        <Contact />
        <Footer />
      </div>

      <AIReceptionist />
      <Toaster />
    </main>
  );
}
