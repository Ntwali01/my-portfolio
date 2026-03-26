import PillNav from '@/components/PillNav';

const navItems = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Services',     href: '#services' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

export function Navigation() {
  return (
    <PillNav
      items={navItems}
      baseColor="oklch(0.12 0 0)"
      pillColor="oklch(0.20 0 0)"
      hoveredPillTextColor="oklch(0.12 0 0)"
      pillTextColor="oklch(0.70 0 0)"
      ease="power3.out"
      initialLoadAnimation={true}
    />
  );
}
