'use client';

import { ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import TrueFocus from '@/components/TrueFocus';
import { heroData, contactInfo } from '@/lib/portfolio-data';

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
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden">
      {/* GradientBlinds — z-index 0, behind everything */}
      {showBackground && (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.15}
            blindCount={8}
            blindMinWidth={80}
            spotlightRadius={0.28}
            spotlightSoftness={1}
            spotlightOpacity={0.30}
            mouseDampening={0.25}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>
      )}

      {/* Bottom fade — z-index 1: above canvas, below content (z-10) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 1,
          height: '60%',
          background: 'linear-gradient(to bottom, transparent 0%, oklch(0.08 0 0) 50%, oklch(0.08 0 0) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative" style={{ zIndex: 10 }}>
        {/* Animated background accent */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Professional Identity Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border/80 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <p className="text-xs sm:text-sm font-medium text-accent tracking-wide">
            {heroData.role}
          </p>
        </div>

        {/* Name Header */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            <TrueFocus
              sentence={heroData.name}
              manualMode={false}
              blurAmount={6}
              borderColor="oklch(0.60 0.18 185)"
              glowColor="rgba(0, 214, 255, 0.55)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
            />
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white/95 max-w-3xl mx-auto pt-2 leading-snug">
            {heroData.headline}
          </h2>
        </div>

        {/* Hero Description */}
        {heroData.description && (
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:bg-accent/85 transition-all duration-200 shadow-lg shadow-accent/20 cursor-pointer"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[oklch(0.12_0_0)] text-foreground font-semibold text-sm uppercase tracking-wide border border-[oklch(0.30_0_0)] hover:border-accent/60 hover:bg-[oklch(0.18_0_0)] transition-all duration-200 cursor-pointer"
          >
            Get In Touch
            <Mail className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* Confirmed Direct Contact Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4 text-xs sm:text-sm text-muted-foreground">
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 hover:bg-secondary text-foreground hover:text-accent border border-border transition-colors"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4 text-accent" />
            <span>{contactInfo.email}</span>
          </a>
          {contactInfo.phone && (
            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 hover:bg-secondary text-foreground hover:text-accent border border-border transition-colors"
              aria-label="Phone contact"
            >
              <Phone className="w-4 h-4 text-[#5df7c1]" />
              <span>{contactInfo.phone}</span>
            </a>
          )}
          {contactInfo.github && (
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary/60 hover:bg-secondary text-foreground border border-border transition-colors"
              aria-label="GitHub profile"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {contactInfo.linkedin && (
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary/60 hover:bg-secondary text-foreground border border-border transition-colors"
              aria-label="LinkedIn profile"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pt-8">
          <Link href="#about" aria-label="Scroll to about section" className="text-muted-foreground/60 hover:text-accent transition-colors">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

    </section>
  );
}
