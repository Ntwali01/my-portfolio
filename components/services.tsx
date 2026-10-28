'use client';

import { services } from '@/lib/portfolio-data';
import { Code, Palette, Zap, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Code,
  Palette,
  Zap,
};

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Services & Capabilities</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Practical technical and creative services grounded in real implementation abilities and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            return (
              <div
                key={service.id}
                className="bg-card/80 backdrop-blur-sm p-7 rounded-xl border border-border hover:border-accent/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 inline-block p-3.5 bg-secondary rounded-lg group-hover:bg-accent group-hover:text-accent-foreground text-accent transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {service.deliverables && (
                  <div className="pt-4 border-t border-border/60 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Scope & Focus
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="text-xs text-white/70 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5df7c1] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
