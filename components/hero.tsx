'use client';

import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import TrueFocus from '@/components/TrueFocus';

const GradientBlinds = dynamic(() => import('@/components/GradientBlinds'), { ssr: false });

export function Hero() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px)');
    const update = () => setShowBackground(!mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 overflow-hidden">
      {/* GradientBlinds background */}
      {showBackground && (
        <div className="absolute inset-0 -z-10">
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.15}
            blindCount={8}
            blindMinWidth={80}
            spotlightRadius={0.45}
            spotlightSoftness={1}
            spotlightOpacity={0.85}
            mouseDampening={0.25}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated background accent */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Greeting */}
        <div className="space-y-2">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">Welcome to my portfolio</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <TrueFocus
              sentence="Cyubahiro Ntwali Adore"
              manualMode={false}
              blurAmount={6}
              borderColor="oklch(0.60 0.18 185)"
              glowColor="rgba(0, 214, 255, 0.55)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
            />
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Full-Stack Developer & Creative Technologist Building Smart, Scalable Digital Experiences
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="#projects">
            <button className="flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:bg-accent/85 transition-colors duration-200">
              View My Work
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="#contact">
            <button className="flex items-center gap-2 px-7 py-3 rounded-full bg-[oklch(0.12_0_0)] text-foreground font-semibold text-sm uppercase tracking-wide border border-[oklch(0.30_0_0)] hover:border-accent/60 hover:bg-[oklch(0.18_0_0)] transition-colors duration-200">
              Get In Touch
              <Mail className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pt-16">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom fade transition into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-background/60 to-background" />
    </section>
  );
}
