'use client';

import { aboutData } from '@/lib/portfolio-data';
import { Bot, CheckCircle, Code2, Sparkles } from 'lucide-react';

const highlightIcons = [Bot, CheckCircle, Code2, Sparkles];

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* Section header */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">About Me</h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
              Background, practical experience & engineering approach
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Biography copy */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Hi! I'm <span className="text-[#5df7c1] font-semibold">Cyubahiro Ntwali Adore</span>, a software developer and creative technologist based in Rwanda, with practical experience in robotics teleoperation, video quality assurance, and web development.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                My experience at <span className="text-[#00d6ff] font-semibold">Neotix</span> has given me hands-on exposure to operating robots using handheld controllers, VR headsets, and YAM-YAM leader–follower robotic arms. I've also reviewed teleoperation recordings against Standard Operating Procedures (SOPs), validating or rejecting submissions based on task requirements.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                Alongside my robotics and QA experience, I work with modern web technologies and enjoy building digital solutions, designing intuitive user interfaces, and exploring AI-powered applications. My goal is to combine technical problem-solving, creativity, and attention to detail to build useful, reliable digital experiences.
              </p>
            </div>

            {/* Qualitative Highlights (No invented statistics) */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {aboutData.qualitativeHighlights.map((highlight, index) => {
                const IconComponent = highlightIcons[index % highlightIcons.length];
                return (
                  <div
                    key={highlight.title}
                    className="bg-card/70 backdrop-blur-sm p-5 rounded-xl border border-border hover:border-accent/60 transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
