'use client';

import { howIWorkPrinciples } from '@/lib/portfolio-data';
import { Brain, CheckCircle2, FileCheck, ShieldCheck, RefreshCw } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  RefreshCw,
};

export function HowIWork() {
  return (
    <section id="how-i-work" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How I Work</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            My engineering philosophy is rooted in precision, procedural discipline, and continuous iteration.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howIWorkPrinciples.map((principle, index) => {
            const IconComponent = iconMap[principle.icon] || CheckCircle2;
            return (
              <div
                key={principle.id}
                className={`bg-card/80 backdrop-blur-sm p-7 rounded-xl border border-border hover:border-accent/70 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-secondary rounded-lg text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {principle.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-[#5df7c1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5df7c1]" />
                  <span>Standard workflow standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Backwards compatibility alias
export const Testimonials = HowIWork;
