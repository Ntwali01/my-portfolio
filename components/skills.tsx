'use client';

import { skills } from '@/lib/portfolio-data';
import { Layout, Server, Bot, ShieldCheck, Palette, Cpu } from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Layout,
  'Backend & Databases': Server,
  Robotics: Bot,
  'Quality Assurance': ShieldCheck,
  'UI/UX & Design': Palette,
  'AI & Automation': Cpu,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Skills & Technical Capabilities</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Practical competencies developed through hands-on robotics teleoperation, SOP-based quality assurance, web development, and digital design.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup) => {
            const IconComponent = categoryIcons[skillGroup.category] || Layout;
            return (
              <div
                key={skillGroup.category}
                className="bg-card/75 backdrop-blur-sm p-6 sm:p-7 rounded-xl border border-border hover:border-accent/70 hover:bg-secondary/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {skillGroup.category}
                    </h3>
                  </div>

                  {skillGroup.description && (
                    <p className="text-xs text-muted-foreground mb-5">
                      {skillGroup.description}
                    </p>
                  )}

                  {/* Skill Items / Grouped Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-secondary text-foreground/90 border border-border/80 group-hover:border-accent/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-[#5df7c1]">Verified workflow capability</span>
                  <span>{skillGroup.items.length} items</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
