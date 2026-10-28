'use client';

import { Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { contactInfo } from '@/lib/portfolio-data';

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: '#5df7c1', letterSpacing: '-1px' }}>CA</h3>
            <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
              Cyubahiro Ntwali Adore
            </p>
            <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Software Developer | Robotics Teleoperation | Quality Assurance based in Rwanda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#services', label: 'Services' },
                { href: '#projects', label: 'Projects' },
                { href: '#experience', label: 'Experience' },
                { href: '#how-i-work', label: 'How I Work' },
                { href: '#contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#5df7c1')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Core Areas */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Focus Areas
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Robotics Teleoperation',
                'Video Quality Assurance & SOPs',
                'Modern Web Development',
                'UI/UX Design',
                'Workflow Automation',
              ].map((s) => (
                <span key={s} style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Direct Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href={`mailto:${contactInfo.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#5df7c1')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(93,247,193,0.1)', border: '1px solid rgba(93,247,193,0.25)',
                  color: '#5df7c1',
                }}>
                  <Mail size={16} />
                </div>
                <span>{contactInfo.email}</span>
              </a>

              {contactInfo.phone && (
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00d6ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,214,255,0.1)', border: '1px solid rgba(0,214,255,0.25)',
                    color: '#00d6ff',
                  }}>
                    <Phone size={16} />
                  </div>
                  <span>{contactInfo.phone}</span>
                </a>
              )}

              {contactInfo.github && (
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  <span>GitHub Profile</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {contactInfo.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(93,247,193,0.2), transparent)', margin: '0 0 24px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            © {currentYear} Cyubahiro Ntwali Adore. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
            Software Developer · Robotics Teleoperation · Quality Assurance
          </p>
        </div>
      </div>
    </footer>
  );
}
