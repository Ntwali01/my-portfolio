'use client';

import { experiences } from '@/lib/portfolio-data';
import { Bot, Code2, MapPin, CheckCircle2 } from 'lucide-react';

const roleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  neotix: Bot,
  'web-dev-projects': Code2,
};

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Practical Experience</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80">
            Hands-on technical roles spanning robotics teleoperation, data quality assurance, and software engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {experiences.map((experience, index) => {
            const IconComponent = roleIcons[experience.id] || Code2;
            return (
              <div key={experience.id} className="relative pl-6 sm:pl-8 pb-4">
                {/* Timeline connector line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-[11px] sm:left-[15px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent"></div>
                )}

                {/* Timeline indicator node */}
                <div className="absolute left-0 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-card border-2 border-accent flex items-center justify-center text-accent">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Experience Card */}
                <div className="bg-card/85 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border hover:border-accent/70 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5df7c1]">
                          {experience.company}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {experience.jobTitle}
                      </h3>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-muted-foreground">
                      {experience.duration && (
                        <span className="px-2.5 py-1 rounded-full bg-secondary border border-border font-medium">
                          {experience.duration}
                        </span>
                      )}
                      {experience.location && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {experience.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {experience.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Responsibilities & Deliverables:
                    </h4>
                    <ul className="space-y-2.5">
                      {experience.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className="text-sm text-white/75 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
