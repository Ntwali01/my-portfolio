import { testimonials } from '@/lib/portfolio-data';
import { Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">What Clients Say</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Trusted by clients and collaborators for delivering <span className="text-[#5df7c1] font-medium">exceptional results</span> and meaningful impact.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed italic">
                "{testimonial.testimonial}"
              </p>

              {/* Author info */}
              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
