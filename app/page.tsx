import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Testimonials } from '@/components/testimonials';
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
        {/* Top fade to blend Hero into Grainient section */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>

      <AIReceptionist />
      <Toaster />
    </main>
  );
}
