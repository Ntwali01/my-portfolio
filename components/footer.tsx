'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a1a0f 0%, #0d2010 40%, #071409 100%)',
      borderTop: '1px solid rgba(93,247,193,0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grass grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
        opacity: 0.6,
      }} />

      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(93,247,193,0.5), rgba(0,214,255,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Radial green glow bottom-left */}
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1152, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#5df7c1', letterSpacing: '-1px' }}>CA</h3>
            <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
              Full-Stack Developer & Creative Technologist building digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['#about', '#projects', '#services', '#contact'].map((href, i) => (
                <Link key={href} href={href} style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#5df7c1')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {['About', 'Projects', 'Services', 'Contact'][i]}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Web Development', 'UI/UX Design', 'AI Solutions', 'Content Creation'].map((s) => (
                <span key={s} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Follow Me */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Follow Me
            </h4>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { href: 'https://github.com', icon: <Github size={18} />, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { href: 'https://twitter.com', icon: <Twitter size={18} />, label: 'Twitter' },
                { href: 'mailto:cyubahirontwaliadore@gmail.com', icon: <Mail size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 40, height: 40, borderRadius: 10, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(93,247,193,0.08)',
                    border: '1px solid rgba(93,247,193,0.2)',
                    color: 'rgba(255,255,255,0.75)',
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(93,247,193,0.18)';
                    e.currentTarget.style.color = '#5df7c1';
                    e.currentTarget.style.borderColor = 'rgba(93,247,193,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(93,247,193,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                    e.currentTarget.style.borderColor = 'rgba(93,247,193,0.2)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(93,247,193,0.2), transparent)', margin: '0 0 24px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            © {currentYear} Cyubahiro Ntwali Adore. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a key={t} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5df7c1')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
