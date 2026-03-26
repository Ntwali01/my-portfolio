export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Section header */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Hi! I'm <span className="text-[#5df7c1] font-semibold">Cyubahiro</span>, a passionate <span className="text-[#00d6ff] font-semibold">full-stack developer</span> and <span className="text-[#5df7c1] font-semibold">creative technologist</span> based in Rwanda.
                I specialize in building modern, scalable web applications that solve real-world problems.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                My journey in tech started with a curiosity about how things work, which evolved into a
                professional focus on crafting <span className="text-[#00d6ff] font-semibold">beautiful, functional digital experiences</span>. I combine technical
                expertise with creative thinking to deliver solutions that go beyond expectations.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                When I'm not coding, you'll find me exploring <span className="text-[#5df7c1] font-semibold">new AI technologies</span>, creating video content,
                or <span className="text-[#00d6ff] font-semibold">mentoring aspiring developers</span>. I'm always excited to collaborate on projects that make a difference.
              </p>
            </div>

            {/* Stats or highlights */}
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="text-4xl font-bold text-accent mb-2">4+</div>
                <div className="text-muted-foreground">Full-Stack Projects Completed</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="text-4xl font-bold text-accent mb-2">5+</div>
                <div className="text-muted-foreground">Years of Tech Experience</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="text-4xl font-bold text-accent mb-2">20+</div>
                <div className="text-muted-foreground">Happy Clients & Collaborators</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-muted-foreground">Dedication to Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
