export const en = {
  lang: 'en',
  skipLink: 'Skip to content',
  common: {
    github: 'GitHub ↗',
     gitlab: 'GitLab ↗',
    live: 'Live ↗',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    experience: 'Experience',
    contact: 'Contact',
    downloadCV: 'Download CV',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
  },
  hero: {
    eyebrow: 'Fullstack Developer',
    available: 'Available',
    name1: 'Mahery',
    name2: 'Ramahay',
    description:
      "I build while learning — and I learn by building.",
    cta: 'See my work',
    ctaContact: 'Get in touch',
    marquee: ['Spring Boot', 'Node.js', 'Symfony', 'React', 'Angular', 'Odoo'],
    scroll: 'scroll',
    photoAlt: 'Portrait of Mahery Ramahay',
    story: {
      stack: {
        label: 'Core stack',
        title: 'What I build with',
        items: ['React', 'Spring Boot', 'PostgreSQL', 'GitHub'],
      },
      intent: {
        label: 'Approach',
        title: 'Learn fast. Ship clean.',
        body:
          'Fullstack, curious and adaptable — I understand the problem before writing the fix.',
      },
      cta: {
        label: 'Next',
        title: 'Shall we continue?',
        body: 'Browse my projects, or just reach out.',
      },
    },
  },
  about: {
    meta: {
      location: 'Location',
      email: 'Email',
      phone: 'Phone',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      status: 'Status',
    },
    title: 'About',
    subtitle: 'The dev behind the terminal',
    paragraphs: [
      'Code runs in the family.',
      "Growing up, I watched my father work at his screen. I didn't understand much of those scrolling lines, but I already knew that's where the magic happened. I was immersed in that world indirectly for years, so choosing development wasn't a surprise — it was inevitable.",
      "Once I started myself, curiosity became passion. Now graduated, I'm launching my career with the drive to build my own solutions, while continuing my studies to go even further.",
    ],
    location: 'Antananarivo, Madagascar',
    email: 'maheryramahay@gmail.com',
    phone: '+261 38 72 721 78',
    github: 'MaheryJeremie',
    githubUrl: 'https://github.com/MaheryJeremie',
    linkedin: 'Mahery Ramahay Mandimby',
    linkedinUrl: 'https://www.linkedin.com/in/mahery-ramahay-mandimby-823b6b315/',
    interests: {
      title: 'Interests',
      items: ['Music', 'Video Games', 'Tech Products'],
    },
    languages: {
      title: 'Languages',
      items: [
        { lang: 'Malagasy', level: 'Native' },
        { lang: 'French', level: 'Fluent' },
        { lang: 'English', level: 'Intermediate' },
      ],
    },
  },
  projects: {
    title: 'Projects',
    subtitle: 'Things I shipped',
    featured: 'Featured',
    problem: 'Problem',
    result: 'Result',
    items: [
      {
        name: 'Shopping Centre App',
        problem:
          'An Akoor-style shopping centre needed one shared tool for admins, merchants, and clients — without juggling separate systems.',
        result:
          'Multi-role app: admin (users, shops, events), merchants (store info, promotions), and clients (listings, reviews, favourites).',
        tech: ['Node.js', 'Express', 'Angular', 'MongoDB'],
        github: 'https://gitlab.com/MaheryJeremie/m1p13mean-rehareha-mahery',
        live: 'https://m1p13mean-rehareha-mahery.netlify.app/',
        highlight: true,
        tag: 'Academic project',
        image: '/images/projects/shopping-centre.webp',
        imageAlt: 'Shopping Centre App preview',
      },
      {
        name: 'Budget Management Module (Odoo)',
        problem:
          'Odoo 8’s built-in budget management module did not meet the needs of the host company.',
        result:
          'Custom module: budget planning, expense tracking, comparative analysis, dashboard, and automated notifications.',
        tech: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
        github: 'https://github.com/MaheryJeremie/Gestion-budgetaire',
        live: null,
        highlight: true,
        tag: 'Degree project',
        image: '/images/projects/odoo-budget.webp',
        imageAlt: 'Odoo Budget Management module preview',
      },
      {
        name: 'AI Study Assistant',
        problem:
          'Long PDFs are hard to study: you waste time rereading, summarising, and checking what stuck.',
        result:
          'A platform that turns PDFs into AI study tools: summary, sourced RAG chat, quizzes, flashcards, and progress tracking.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'JWT', 'RAG'],
        live: '',
        highlight: true,
        tag: 'Personal project',
        image: '/images/projects/ai-study-assistant.webp',
        imageAlt: 'AI Study Assistant preview',
      },
      {
        name: 'AsaFinder',
        problem:
          'Job offers are scattered across multiple platforms, which makes searching difficult.',
        result:
          'One search to find matching offers — without juggling between sites.',
        tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
        github: 'https://github.com/MaheryJeremie/job-finder',
        live: null,
        highlight: true,
        tag: 'Personal project',
        image: '/images/projects/asafinder.webp',
        imageAlt: 'AsaFinder preview',
      },
    ],
  },
  skills: {
    title: 'Skills',
    subtitle: 'My technical stack',
    categories: [
      {
        key: 'frontend',
        label: 'Frontend',
        items: ['React', 'Angular', 'React Native', 'Bootstrap'],
      },
      {
        key: 'backend',
        label: 'Backend',
        items: ['Spring Boot', 'Node.js', 'Symfony', '.NET', 'Odoo'],
      },
      {
        key: 'languages',
        label: 'Languages',
        items: ['Java', 'PHP', 'Python', 'JavaScript', 'C', 'C#'],
      },
      {
        key: 'database',
        label: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB'],
      },
      {
        key: 'tools',
        label: 'Tools',
        items: ['Gitlab / GitHub', 'Docker', 'Firebase', 'Photoshop'],
      },
    ],
  },
  education: {
    title: 'Education',
    subtitle: 'My academic background',
    items: [
      {
        degree: 'Master 1 — Computer Science',
        school: 'IT University',
        period: 'January 2026 — Present',
        location: 'Andoharanofotsy, Madagascar',
        description: 'Common core curriculum.',
      },
      {
        degree: "Bachelor's Degree — Computer Science",
        school: 'IT University',
        period: 'September 2022 — December 2025',
        location: 'Andoharanofotsy, Madagascar',
        description: 'Development track.',
      },
      {
        degree: 'High School Diploma (Baccalauréat) — Science',
        school: 'Collège Saint Michel',
        period: '2010 — 2022',
        location: 'Amparibe, Madagascar',
        description: 'Science track.',
      },
    ],
  },
  experience: {
    title: 'Experience',
    subtitle: "Where I've worked",
    jobs: [
      {
        role: 'Fullstack Developer',
        company: 'GeoMadagascar',
        period: 'April 2026 - July 2026',
        location: 'Antananarivo, Madagascar',
        type: 'Internship',
        tech: ['Symfony', 'PHP', 'PostgreSQL'],
        bullets: [
          'Redesign and modernisation of the ConsoMyZone website interface.',
          'Optimisation of key business functions to improve performance and user experience.',
        ],
      },
      {
        role: 'Odoo Developer',
        company: 'Assurances ARO',
        period: 'September 2025 - November 2025',
        location: 'Antananarivo, Madagascar',
        type: 'Internship',
        tech: ['Odoo 8', 'Python', 'XML', 'PostgreSQL'],
        bullets: [
          'Designed and built a custom budget management module for Odoo 8 from scratch.',
          'Implemented real-time expense tracking with comparative analysis dashboards.',
          'Set up automated email notifications triggered by budget threshold events.',
          'Wrote full technical and functional documentation for handover.',
        ],
      },
    ],
  },
  cta: {
    title: "Let's build\nsomething.",
    subtitle:
      'Open to opportunities — internships, full-time roles, freelance projects.',
    btnCV: 'Download CV',
    btnContact: 'Get in touch',
    email: 'maheryramahay@gmail.com',
    emailAria: 'Send an email to maheryramahay@gmail.com — opens your mail app',
    form: {
      title: 'Send a message',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Message sent — I\'ll get back to you soon.',
      error: 'Something went wrong. Try the email button above.',
    },
  },
  footer: {
    built: 'To dare is to do.',
    links: 'GitHub · LinkedIn',
    backToTop: 'Back to top',
    copy: '© {year} Mahery Ramahay Mandimby',
  },
};
