import { experiences } from '@/lib/portfolio-data';

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Work Experience</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80">
            My professional journey and the <span className="text-[#00d6ff] font-medium">roles that shaped my expertise</span>.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative pl-8 pb-8">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent"></div>
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-accent border-4 border-background"></div>

              {/* Content */}
              <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{experience.jobTitle}</h3>
                    <p className="text-accent font-semibold">{experience.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{experience.duration}</span>
                </div>

                <p className="text-muted-foreground mb-4">{experience.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="text-sm text-muted-foreground flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
