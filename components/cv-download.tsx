'use client';

import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function CVDownload() {
  const handleDownloadCV = () => {
    try {
      // Create a simple text-based CV
      const cvContent = `CYUBAHIRO NTWALI ADORE
Full-Stack Developer & Creative Technologist
Email: hello@example.com | Phone: +250 788 123 456 | Location: Kigali, Rwanda

PROFESSIONAL HEADLINE
Full-Stack Developer & Creative Technologist Building Smart, Scalable Digital Experiences

PROFESSIONAL SUMMARY
Passionate full-stack developer with proven expertise in building scalable web applications, AI solutions, and user-centered designs. Dedicated to delivering high-quality digital experiences that drive business value and user satisfaction.

TECHNICAL SKILLS
Frontend: React.js, Next.js, TypeScript, Tailwind CSS, JavaScript, HTML5, CSS3
Backend: Node.js, Express.js, PHP, RESTful APIs, Authentication
Databases: MySQL, Database Design, Query Optimization, CRUD Operations
AI & Automation: AI APIs, Automation, NLP, Chatbots
Tools & Others: Git, GitHub, Responsive Design, UI/UX Design, CapCut, Video Editing

PROFESSIONAL EXPERIENCE

Full-Stack Developer – Freelance Projects (2023 – Present)
• Developed full-stack web applications using React.js, Node.js, and MySQL
• Built and deployed dashboards and inventory management systems
• Integrated front-end UI/UX designs with functional back-end features
• Delivered client-ready projects with responsive, modern interfaces

Web Developer Intern – PlaceholderTech Solutions (Jan 2023 – Dec 2023)
• Assisted in building and maintaining web applications using HTML, CSS, JavaScript, and PHP
• Optimized database queries and implemented CRUD operations
• Collaborated with designers to create intuitive UI/UX layouts
• Learned project lifecycle management and deployment practices

Video Editor & Content Creator – Self-Employed (2022 – Present)
• Produced and edited short story-based videos using CapCut for social media
• Enhanced storytelling with creative visuals, effects, and engaging content
• Optimized content for social media engagement and audience growth
• Managed consistent posting schedule to grow subscribers

AI Projects Developer – Independent Projects (2023 – Present)
• Designing AI-powered applications including virtual AI receptionist
• Experimenting with AI APIs to automate customer interactions
• Building solutions for real-world business applications

KEY PROJECTS

1. Admin Dashboard
   • Modern dashboard for product and user management
   • Tech: React.js, Node.js, MySQL
   • Features: Analytics, inventory management, responsive design

2. Stock Inventory Management System (SIMS)
   • Full-stack inventory tracking and management
   • Tech: React.js, Node.js, MySQL
   • Features: Real-time tracking, reports, authentication

3. Bulk Payment System
   • Multi-payment processing system
   • Tech: PHP, MySQL
   • Features: Batch processing, secure handling, export functionality

4. AI Receptionist
   • AI-powered virtual assistant (In Progress)
   • Tech: AI APIs, JavaScript, React.js
   • Features: Automated responses, NLP, customer inquiry handling

EDUCATION & CERTIFICATIONS
• Web Development Training – Tech Startup (2023)
• Self-directed learning in Full-Stack Development

LANGUAGES
• English (Fluent)
• French (Intermediate)
• Kinyarwanda (Native)

INTERESTS
• Web Development & Open Source
• Artificial Intelligence & Machine Learning
• UI/UX Design & Creative Technology
• Video Production & Content Creation
• Mentoring & Knowledge Sharing

---
Generated: ${new Date().toLocaleDateString()}`;

      // Create a blob and download
      const blob = new Blob([cvContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Cyubahiro_Ntwali_Adore_CV.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('CV downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download CV');
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleDownloadCV}
      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      <Download className="w-4 h-4" />
      Download CV
    </Button>
  );
}
