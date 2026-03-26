export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  image: string;
  link?: string;
  github?: string;
  status?: 'completed' | 'in-progress';
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Admin Dashboard',
    description: 'Modern dashboard for product and user management',
    longDescription: 'A modern dashboard-based web application designed for managing products, users, and sales in a clean and interactive interface. Built to demonstrate full-stack development and real-world business solutions.',
    techStack: ['React.js', 'Node.js', 'MySQL'],
    features: [
      'Admin dashboard with analytics',
      'Product & inventory management',
      'User-friendly UI/UX design',
      'Responsive layout'
    ],
    image: '/placeholder-dashboard.jpg',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Bulk Payment System',
    description: 'Efficient payment processing with batch transactions',
    longDescription: 'A system that processes multiple payments at once, designed for efficiency and scalability. Handles secure batch transactions with organized MVC structure.',
    techStack: ['PHP', 'MySQL'],
    features: [
      'Batch transaction processing',
      'Secure database handling',
      'Organized MVC structure',
      'Export functionality'
    ],
    image: '/placeholder-payment.jpg',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Stock Inventory Management (SIMS)',
    description: 'Full-stack inventory tracking and management system',
    longDescription: 'A full-stack system developed for managing stock, tracking inventory, and improving business operations with real-time updates.',
    techStack: ['React.js', 'Node.js', 'MySQL'],
    features: [
      'Real-time inventory tracking',
      'Add/update/delete products',
      'Reports and insights',
      'Authentication system'
    ],
    image: '/placeholder-inventory.jpg',
    status: 'completed'
  },
  {
    id: '4',
    title: 'AI Receptionist',
    description: 'AI-powered virtual assistant for customer interaction',
    longDescription: 'An AI-powered virtual assistant designed to handle customer inquiries and automate communication. Combining AI APIs with intelligent response systems.',
    techStack: ['AI APIs', 'JavaScript', 'React.js'],
    features: [
      'Automated responses',
      'Natural language processing',
      'Customer inquiry handling',
      'Integration ready'
    ],
    image: '/placeholder-ai.jpg',
    status: 'completed'
  }
];

export const experiences: Experience[] = [
  {
    id: '1',
    jobTitle: 'Full-Stack Developer',
    company: 'Freelance Projects',
    duration: '2023 – Present',
    description: 'Developing full-stack web applications using React.js, Node.js, and MySQL. Building dashboards and inventory management systems.',
    achievements: [
      'Developed full-stack web applications using React.js, Node.js, and MySQL',
      'Built dashboards and inventory management systems like JuicyFresh and SIMS',
      'Integrated front-end UI/UX designs with functional back-end features',
      'Delivered client-ready projects with responsive, modern interfaces'
    ]
  },
  {
    id: '2',
    jobTitle: 'Web Developer Intern',
    company: 'PlaceholderTech Solutions',
    duration: 'Jan 2023 – Dec 2023',
    description: 'Assisted in building and maintaining web applications using HTML, CSS, JavaScript, and PHP.',
    achievements: [
      'Assisted in building and maintaining web applications using HTML, CSS, JavaScript, and PHP',
      'Optimized database queries and implemented CRUD operations',
      'Collaborated with designers to create intuitive UI/UX layouts',
      'Learned project lifecycle management and deployment practices'
    ]
  },
  {
    id: '3',
    jobTitle: 'Video Editor & Content Creator',
    company: 'Self-Employed / YouTube Channel',
    duration: '2022 – Present',
    description: 'Producing and editing short story-based videos with creative visuals and effects.',
    achievements: [
      'Produced and edited short story-based videos using CapCut',
      'Enhanced storytelling by integrating creative visuals and effects',
      'Optimized content for social media engagement',
      'Managed consistent posting schedule for audience growth'
    ]
  },
  {
    id: '4',
    jobTitle: 'AI Projects Developer',
    company: 'Personal / Independent Projects',
    duration: '2023 – Present',
    description: 'Designing and building AI-powered applications including virtual assistants.',
    achievements: [
      'Designing AI-powered applications including virtual AI receptionist',
      'Experimenting with AI APIs to automate customer interactions',
      'Building solutions aimed at real-world business applications',
      'Combining AI, web development, and UI/UX design skills'
    ]
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs', 'Authentication']
  },
  {
    category: 'Databases',
    items: ['MySQL', 'Database Design', 'Query Optimization', 'CRUD Operations']
  },
  {
    category: 'AI & Automation',
    items: ['AI APIs', 'Automation', 'NLP', 'Chatbots']
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'GitHub', 'Responsive Design', 'UI/UX Design', 'CapCut', 'Video Editing']
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Full-stack web development using React, Node.js, and modern technologies',
    icon: 'Code'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Creating beautiful, functional, and user-friendly interfaces',
    icon: 'Palette'
  },
  {
    id: '3',
    title: 'AI Solutions',
    description: 'Building AI-powered applications and automation systems',
    icon: 'Zap'
  },
  {
    id: '4',
    title: 'Content Creation',
    description: 'Video editing and creative content production',
    icon: 'Film'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    title: 'Business Owner',
    company: 'E-Commerce Solutions',
    testimonial: 'Cyubahiro delivered an exceptional dashboard that transformed how we manage our inventory. Professional, responsive, and truly talented!',
    image: '/avatar-1.jpg'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Project Manager',
    company: 'Tech Startup',
    testimonial: 'Working with Cyubahiro was a great experience. They built our payment system with impressive accuracy and attention to detail.',
    image: '/avatar-2.jpg'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: 'CEO',
    company: 'Digital Innovations',
    testimonial: 'The SIMS system has been a game-changer for our operations. Highly recommend Cyubahiro for any web development needs.',
    image: '/avatar-3.jpg'
  }
];
