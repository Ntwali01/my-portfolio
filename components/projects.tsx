'use client';

import { useState } from 'react';
import { projects, Project } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ExternalLink, Github, Info, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Concept':
        return (
          <Badge
            variant="outline"
            className="border-amber-400/50 text-amber-300 bg-amber-500/10 font-medium text-xs px-2.5 py-0.5"
          >
            Concept
          </Badge>
        );
      case 'In Development':
        return (
          <Badge
            variant="default"
            className="bg-[#00d6ff]/15 text-[#00d6ff] border border-[#00d6ff]/40 font-medium text-xs px-2.5 py-0.5"
          >
            In Development
          </Badge>
        );
      case 'Functional Prototype':
        return (
          <Badge
            variant="outline"
            className="border-[#5df7c1]/50 text-[#5df7c1] bg-[#5df7c1]/10 font-medium text-xs px-2.5 py-0.5"
          >
            Functional Prototype
          </Badge>
        );
      case 'Completed':
        return (
          <Badge
            variant="outline"
            className="border-emerald-400/50 text-emerald-400 bg-emerald-500/10 font-medium text-xs px-2.5 py-0.5"
          >
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Projects</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Applied software projects, functional prototypes, and architectural concepts across web applications and workflow automation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-accent/70 transition-all duration-300 hover:shadow-xl flex flex-col group"
            >
              <div className="p-7 sm:p-8 flex flex-col flex-grow">
                {/* Header: Title and Status */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    {project.category && (
                      <span className="text-xs uppercase tracking-wider text-[#5df7c1] font-medium block mb-1">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div>{getStatusBadge(project.status)}</div>
                </div>

                {project.subtitle && (
                  <p className="text-xs text-muted-foreground font-medium mb-3">
                    {project.subtitle}
                  </p>
                )}

                {/* Concise Description */}
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Features Preview */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Core Functionality / Scope
                  </h4>
                  <ul className="space-y-1.5">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-xs text-white/75 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-1.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-secondary text-foreground/80 border border-border/60 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-border/60">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProject(project)}
                    className="gap-2 flex-1 border-accent/40 text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-accent group-hover:text-current" />
                    View Details
                  </Button>

                  {/* Only display Live Demo or Source Code if verified URL exists */}
                  {project.link && (
                    <Button
                      size="sm"
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-2xl bg-card border-border text-foreground">
            <DialogHeader className="space-y-2">
              <div className="flex items-center justify-between gap-3 pr-6">
                <span className="text-xs uppercase tracking-wider text-[#5df7c1] font-semibold">
                  {selectedProject.category || 'Project Overview'}
                </span>
                {getStatusBadge(selectedProject.status)}
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedProject.title}
              </DialogTitle>
              {selectedProject.subtitle && (
                <p className="text-sm text-accent font-medium">
                  {selectedProject.subtitle}
                </p>
              )}
              <DialogDescription className="text-white/80 text-sm leading-relaxed pt-2">
                {selectedProject.longDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-4 border-t border-border">
              {/* Architecture & Features */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5df7c1]" />
                  Key Features & Workflows
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-white/75 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00d6ff]" />
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-md bg-secondary text-foreground font-medium border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 rounded-lg bg-secondary/50 border border-border/80 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Current Status: {selectedProject.status}.</strong>{' '}
                  {selectedProject.status === 'Completed'
                    ? 'This project has been built and delivered as a functional application.'
                    : selectedProject.status === 'Concept'
                    ? 'Architecture and interface specifications are documented; implementation follows project scope.'
                    : 'Active development focusing on core modules, data modeling, and workflow reliability.'}
                </p>
              </div>

              {/* Links if available */}
              {(selectedProject.link || selectedProject.github) && (
                <div className="flex gap-3 pt-2">
                  {selectedProject.link && (
                    <Button size="sm" className="gap-2 bg-accent text-accent-foreground" asChild>
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        Visit Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {selectedProject.github && (
                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        View Repository
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
