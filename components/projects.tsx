import { projects } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Featured Projects</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            A selection of projects showcasing my expertise in <span className="text-[#5df7c1] font-medium">full-stack development, AI</span>, and creative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-card rounded-lg border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Project header */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Status badge and title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                    {project.status && (
                      <Badge
                        variant={project.status === 'completed' ? 'outline' : 'default'}
                        className={project.status === 'completed'
                          ? 'border-[#5df7c1] text-[#5df7c1] bg-transparent'
                          : 'bg-[#00d6ff] text-black font-semibold'}
                      >
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/75 text-sm mb-6">{project.longDescription}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 2).map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-white/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 2 && (
                      <li className="text-sm text-accent font-medium">+ {project.features.length - 2} more features</li>
                    )}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto pt-6 border-t border-border">
                  {project.link && (
                    <Button
                      size="sm"
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {!project.link && !project.github && (
                    <Button size="sm" variant="outline" className="flex-1" disabled>
                      Details Available
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
