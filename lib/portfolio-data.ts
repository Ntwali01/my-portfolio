export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  status: 'Concept' | 'In Development' | 'Functional Prototype' | 'Completed';
  category?: string;
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  duration?: string;
  location?: string;
  description: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  description?: string;
  items: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables?: string[];
}

export interface WorkPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SocialConfig {
  email: string;
  phone?: string;
  location: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export const contactInfo: SocialConfig = {
  email: 'cyubahirontwaliadore@gmail.com',
  phone: '+250 798 221 657',
  location: 'Kigali, Rwanda',
  // Profile links are only displayed when verified URLs are set below
  github: '',
  linkedin: '',
  twitter: '',
};

export const heroData = {
  name: 'Cyubahiro Ntwali Adore',
  role: 'Software Developer | Robotics Teleoperation | Quality Assurance',
  headline: 'Robot Specialist. Builder of Digital Experiences.',
  description: '',
};

export const aboutData = {
  paragraphs: [
    "Hi! I'm Cyubahiro Ntwali Adore, a software developer and creative technologist based in Rwanda, with practical experience in robotics teleoperation, video quality assurance, and web development.",
    "My experience at Neotix has given me hands-on exposure to operating robots using handheld controllers, VR headsets, and YAM-YAM leader–follower robotic arms. I've also reviewed teleoperation recordings against Standard Operating Procedures (SOPs), validating or rejecting submissions based on task requirements.",
    "Alongside my robotics and QA experience, I work with modern web technologies and enjoy building digital solutions, designing intuitive user interfaces, and exploring AI-powered applications. My goal is to combine technical problem-solving, creativity, and attention to detail to build useful, reliable digital experiences."
  ],
  qualitativeHighlights: [
    {
      title: 'Robotics Teleoperation',
      description: 'Hands-on hardware & VR workflows operating leader-follower robotic arms with precision.'
    },
    {
      title: 'SOP-Based Quality Assurance',
      description: 'Systematic validation and review of task recordings against rigorous standards.'
    },
    {
      title: 'Modern Web Engineering',
      description: 'Building clean, responsive applications with React.js, modern JavaScript, and relational databases.'
    },
    {
      title: 'Attention to Detail',
      description: 'Committed to accuracy, repeatable processes, and reliable technical execution.'
    }
  ]
};

export const projects: Project[] = [
  {
    id: 'educonnect',
    title: 'EduConnect',
    subtitle: 'Academic Support & Tutor Discovery Platform',
    description: 'A student academic support platform concept designed to connect students with tutors and study partners through tutor discovery, profiles, bookings, and dashboards.',
    longDescription: 'EduConnect is designed to tackle student collaboration challenges by offering an intuitive discovery engine for tutors and study partners. The architecture includes structured profiles, subject-based filtering, booking coordination, and user dashboards designed with clean usability in mind.',
    techStack: ['React.js', 'Node.js', 'MySQL'],
    features: [
      'Tutor discovery with subject & availability filters',
      'Structured user profiles for tutors and students',
      'Booking workflows and session scheduling concepts',
      'Student and tutor dashboard interface designs'
    ],
    status: 'Completed',
    category: 'EdTech'
  },
  {
    id: 'sims',
    title: 'Inventory Management System',
    subtitle: 'Enterprise Procurement & Inventory Management System',
    description: 'A full-stack inventory management application focused on product records, stock tracking, and inventory workflows, built for enterprise procurement use cases.',
    longDescription: 'A practical full-stack system built to streamline stock and procurement management. It manages product catalogs, stock level updates, transactions, and inventory reporting with relational database persistence. Implemented in TypeScript for improved type safety and long-term maintainability.',
    techStack: ['TypeScript', 'React.js', 'Node.js', 'MySQL'],
    features: [
      'Comprehensive product catalog and stock level tracking',
      'CRUD operations for items, categories, and inventory logs',
      'Relational database modeling with MySQL',
      'Responsive data tables and status overview',
      'TypeScript-based codebase for robust type safety'
    ],
    status: 'Completed',
    category: 'Full-Stack',
    github: 'https://github.com/Ntwali01/inventory-management-system'
  },
  {
    id: 'devcore-ai',
    title: 'DEVCORE-AI',
    subtitle: 'Personal AI Assistant for Developers',
    description: 'A TypeScript-based AI project designed to serve as a personal assistant for developers, helping support their development workflow and productivity.',
    longDescription: 'DEVCORE-AI explores how AI can support developers in their everyday work. The project is built with TypeScript and is designed to be extended with features that address real developer workflow challenges. The repository is private and actively in development.',
    techStack: ['TypeScript', 'Python', 'AI/LLM Integration'],
    features: [
      'Developer workflow automation and AI assistance',
      'TypeScript-first architecture for type safety',
      'Designed for extensibility as features are validated',
      'Explores practical AI tool integration for day-to-day development'
    ],
    status: 'In Development',
    category: 'AI & Automation',
    github: 'https://github.com/Ntwali01/DEVCORE-AI'
  }
];

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    description: 'User interface development & web standards',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Web Design']
  },
  {
    category: 'Backend & Databases',
    description: 'Server logic, APIs & data persistence',
    items: ['Node.js', 'MySQL', 'REST APIs', 'CRUD Operations']
  },
  {
    category: 'Robotics',
    description: 'Teleoperation hardware & spatial workflows',
    items: ['Robot Teleoperation', 'Handheld Controllers', 'VR Headset Workflows', 'YAM-YAM Leader–Follower Robotic Arms']
  },
  {
    category: 'Quality Assurance',
    description: 'SOP compliance & video validation',
    items: ['SOP-Based Video Review', 'Task Validation', 'Recording Quality Checks', 'Requirement-Based Video Acceptance/Rejection']
  },
  {
    category: 'UI/UX & Design',
    description: 'Visual interfaces & user experience design',
    items: ['UI/UX Design', 'Graphic Design', 'Wireframing', 'Responsive Layouts']
  },
  {
    category: 'AI & Automation',
    description: 'Applied AI tools & workflow evaluation',
    items: ['AI Tools', 'AI Application Concepts', 'Evaluation Workflows']
  }
];

export const experiences: Experience[] = [
  {
    id: 'neotix',
    jobTitle: 'Robotics Teleoperation & Video Quality Assurance',
    company: 'Neotix',
    duration: 'Practical Experience',
    location: 'Kigali, Rwanda',
    description: 'Hands-on teleoperation of robotic systems and strict SOP-based quality assurance of training and operational video data.',
    responsibilities: [
      'Operated robotic systems using handheld controllers, VR headsets, and YAM-YAM leader–follower arms.',
      'Reviewed teleoperator recordings against Standard Operating Procedures (SOPs).',
      'Validated or rejected recordings based on precise task requirements and performance criteria.',
      'Applied attention to detail and quality standards when evaluating recorded work.'
    ]
  },
  {
    id: 'web-dev-projects',
    jobTitle: 'Software & Web Development',
    company: 'Independent Project Work',
    duration: 'Ongoing',
    location: 'Rwanda',
    description: 'Designing and building practical web applications, database structures, and workflow automation tools.',
    responsibilities: [
      'Developed responsive user interfaces with React.js, HTML5, and CSS3.',
      'Built backend services and CRUD endpoints utilizing Node.js and MySQL.',
      'Engineered practical applications including an inventory management system and an AI developer assistant concept.',
      'Applied UI/UX design principles to deliver clear, intuitive user experiences.'
    ]
  }
];

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Building responsive, modern websites and applications with React.js, Node.js, and clean relational database integration.',
    icon: 'Code',
    deliverables: ['Custom Web Applications', 'Responsive Landing Pages', 'REST API Integration', 'Database Design']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Creating intuitive, accessible user interfaces with a focus on visual hierarchy, usability, and consistent styling.',
    icon: 'Palette',
    deliverables: ['Wireframing & Prototyping', 'User Interface Systems', 'Responsive Layouts', 'Design Improvements']
  },
  {
    id: 'ai-automation',
    title: 'AI Solutions & Exploration',
    description: 'Practical implementation of AI tools, assistant prototypes, and workflow automation concepts to solve real-world tasks.',
    icon: 'Zap',
    deliverables: ['AI Assistant Integration', 'Prompt & Workflow Evaluation', 'Process Automation Concepts', 'Technical Research']
  }
];

export const howIWorkPrinciples: WorkPrinciple[] = [
  {
    id: 'problem-solving',
    title: 'Problem-Solving & Structured Thinking',
    description: 'Breaking down technical challenges into clear, solvable parts with pragmatic implementation strategies.',
    icon: 'Brain'
  },
  {
    id: 'attention-to-detail',
    title: 'Attention to Detail',
    description: 'Maintaining precision across code structure, interface design, data mapping, and edge case scenarios.',
    icon: 'CheckCircle2'
  },
  {
    id: 'following-specs',
    title: 'Following Specifications & SOPs',
    description: 'Strict adherence to guidelines and standard operating procedures, refined through robotics teleoperation and data QA.',
    icon: 'FileCheck'
  },
  {
    id: 'quality-assurance',
    title: 'Quality Assurance & Validation',
    description: 'Systematic verification of features, recordings, and outputs to ensure they meet required benchmarks.',
    icon: 'ShieldCheck'
  },
  {
    id: 'iterative-development',
    title: 'Iterative Development & Communication',
    description: 'Building incrementally, incorporating feedback, and keeping documentation transparent at every stage.',
    icon: 'RefreshCw'
  }
];
