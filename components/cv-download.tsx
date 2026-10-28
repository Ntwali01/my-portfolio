'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { heroData, contactInfo, aboutData, experiences, skills } from '@/lib/portfolio-data';

export function CVDownload() {
  const handleDownloadCV = () => {
    try {
      const cvContent = `${heroData.name.toUpperCase()}
${heroData.role}
Email: ${contactInfo.email} | Phone: ${contactInfo.phone} | Location: ${contactInfo.location}

PROFESSIONAL SUMMARY
${aboutData.paragraphs.join('\n\n')}

PRACTICAL EXPERIENCE
${experiences
  .map(
    (exp) => `
${exp.jobTitle} — ${exp.company} (${exp.duration || 'Practical Experience'}, ${exp.location || 'Rwanda'})
${exp.description}
Responsibilities:
${exp.responsibilities.map((r) => `• ${r}`).join('\n')}`
  )
  .join('\n\n')}

TECHNICAL CAPABILITIES
${skills.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n')}
`;

      const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Cyubahiro-Ntwali-Adore-Profile.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('CV summary downloaded successfully.');
    } catch {
      toast.error('Failed to generate summary file.');
    }
  };

  return (
    <Button
      onClick={handleDownloadCV}
      variant="outline"
      size="sm"
      className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
    >
      <Download className="w-4 h-4" />
      Download CV Summary
    </Button>
  );
}
