import { services } from '@/lib/portfolio-data';
import { Code, Palette, Zap, Film } from 'lucide-react';

const iconMap = {
  Code: Code,
  Palette: Palette,
  Zap: Zap,
  Film: Film,
};

export function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Services</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Comprehensive services tailored to bring your <span className="text-[#00d6ff] font-medium">digital vision to life</span> with expertise and creativity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            return (
              <div
                key={service.id}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="mb-6 inline-block p-4 bg-secondary rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
