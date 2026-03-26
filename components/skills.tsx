import { skills } from '@/lib/portfolio-data';

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            A comprehensive toolkit of technologies and expertise I've developed over <span className="text-[#5df7c1] font-medium">years of building digital solutions</span>.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg border border-border hover:border-accent hover:bg-secondary/50 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-accent mb-6 group-hover:text-accent">{skillGroup.category}</h3>
              <div className="space-y-3">
                {skillGroup.items.map((skill, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
