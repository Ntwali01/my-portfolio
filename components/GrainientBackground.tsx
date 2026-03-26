'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

export default function GrainientBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 1024px)');
    const update = () => setEnabled(!mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  if (!enabled) {
    return <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,159,252,0.08),_transparent_45%),linear-gradient(180deg,_transparent,_rgba(82,39,255,0.06))]" />;
  }

  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Grainient
        color1="#FF9FFC"
        color2="#5227FF"
        color3="#B19EEF"
        timeSpeed={0.25}
        colorBalance={0}
        warpStrength={1.05}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}
