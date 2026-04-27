export const fr = {
  lang: 'fr',
  nav: {
    about: 'À Propos',
    projects: 'Projets',
    skills: 'Compétences',
    education: 'Formation',
    experience: 'Expérience',
    process: 'Méthode',
    contact: 'Contact',
    downloadCV: 'Télécharger CV',
  },
  hero: {
    eyebrow: 'Développeur Junior · 2026',
    available: 'Disponible',
    name1: 'Mahery',
    name2: 'Ramahay',
    description:
      "Mon job, c'est de transformer vos idées en outils numériques.",
    cta: 'Voir mes projets',
    ctaGithub: 'GitHub ↗',
    marquee: ['Spring Boot', 'Node.js', 'Symfony' , 'React', 'Angular', 'Odoo'],
  },
  about: {
    title: 'À Propos',
    subtitle: 'Le dev derrière le terminal',
    paragraphs: [
      "Le code, c’est une histoire de famille.",
      "Petit, je regardais mon père travailler sur son écran. Je ne comprenais pas grand-chose à ces lignes qui défilaient, mais je savais déjà que c'est là que la magie opérait. J’ai baigné dans cet univers de manière indirecte pendant des années, alors choisir le développement n'a pas été une surprise, mais une évidence.",
      "En m’y mettant moi-même, la curiosité est devenue une passion. Aujourd’hui diplômé, je lance ma carrière avec l’envie de construire mes propres solutions, tout en continuant mes études pour aller encore plus loin.",
    ],
    location: 'Antananarivo, Madagascar',
    email: 'maheryramahay@gmail.com',
    phone: '+261 38 72 721 78',
    github: 'github.com/MaheryJeremie',
    linkedin: 'linkedin.com/in/mahery-ramahay-mandimby-823b6b315',
    interests: {
      title: "Centres d'intérêt",
      items: ['Musique', 'Jeux Vidéo', 'Produits Tech'],
    },
    languages: {
      title: 'Langues',
      items: [
        { lang: 'Malgache', level: 'Langue maternelle' },
        { lang: 'Français', level: 'Courant' },
        { lang: 'Anglais', level: 'Intermédiaire' },
      ],
    },
    stats: [
    ],
  },
  projects: {
    title: 'Projets',
    subtitle: 'Ce que j\'ai construit',
    items: [
      {
        name: 'Application Centre Commercial',
        description: 'Application pour un centre commercial du style Akoor:\n— Admin : gestion globale du centre (utilisateurs, commerces, événements, ...)\n— Commerçants : gestion de leur boutique (informations, promotions, ...)\n— Clients : consultation du site (liste des boutiques, avis, favoris, ...)',
        tech: ['Node.js', 'Express', 'Angular JS', 'MongoDB'],
        github: 'https://gitlab.com/MaheryJeremie/m1p13mean-rehareha-mahery',
        live: 'https://m1p13mean-rehareha-mahery.netlify.app/',
        highlight: true,
        tag: 'Projet académique',
      },
      {
        name: 'Module Gestion Budgétaire (Odoo)',
        description:
          'Module Odoo 8 sur mesure : planification budgétaire, suivi des dépenses en temps réel, analyse comparative, tableau de bord et notifications automatiques.',
        tech: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
        github: 'https://github.com/MaheryJeremie/Gestion-budgetaire',
        live: null,
        highlight: true,
        tag: 'Projet de Licence',
      },
      {
        name: 'Portfolio Personnel',
        description:
          'Ce portfolio — fait avec React, Framer Motion, Three.js, bilingue EN/FR, avec des scènes 3D inspirées de la musique, du gaming et de la tech.',
        tech: ['React', 'Three.js', 'Framer Motion'],
        github: 'https://github.com/MaheryJeremie',
        live: null,
        highlight: true,
        tag: 'Design',
      },
    ],
  },
  skills: {
    title: 'Compétences',
    subtitle: 'Ma stack technique',
    categories: [
      {
        key: 'frontend',
        label: 'Frontend',
        items: ['React', 'Angular JS', 'React Native', 'Vue.js', 'HTML/CSS', 'Bootstrap'],
      },
      {
        key: 'backend',
        label: 'Backend',
        items: ['Spring Boot', 'Node.js / Express', 'Symfony', '.NET', 'Odoo'],
      },
      {
        key: 'languages',
        label: 'Langages',
        items: ['Java', 'PHP', 'Python', 'JavaScript', 'C', 'C#', 'C++'],
      },
      {
        key: 'database',
        label: 'Bases de données',
        items: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Firebase'],
      },
      {
        key: 'tools',
        label: 'Outils',
        items: ['Gitlab / GitHub', 'Docker', 'Firebase'],
      },
    ],
  },
  process: {
    title: 'Ma Méthode',
    subtitle: 'Comment j\'aborde chaque projet',
    steps: [
      {
        num: '01',
        title: 'Comprendre',
        desc: 'Je commence par bien comprendre le problème — besoins utilisateurs, logique métier, contraintes. Pas de code avant la clarté.',
      },
      {
        num: '02',
        title: 'Concevoir',
        desc: "L'architecture d'abord. Schéma propre, contrat API solide, structure des composants. Penser avant de taper.",
      },
      {
        num: '03',
        title: 'Construire',
        desc: 'Développement itératif, commits propres, code lisible. Des features qui marchent, pas juste des features qui partent.',
      },
      {
        num: '04',
        title: 'Affiner',
        desc: "Code review, performances, finitions UX. Ces 20% qui font la différence entre bien et excellent.",
      },
    ],
  },
  education: {
    title: 'Formation',
    subtitle: 'Mon parcours académique',
    items: [
      {
        degree: 'Master 1 — Informatique',
        school: 'IT University',
        period: 'Janvier 2026 — Présent',
        location: 'Andoharanofotsy, Madagascar',
        description: 'Tronc commun.',
      },
      {
        degree: 'Licence — Informatique',
        school: 'IT University',
        period: 'Septembre 2022 — Décembre 2025',
        location: 'Andoharanofotsy, Madagascar',
        description: 'Option développement.',
      },
      {
        degree: 'Baccalauréat — Série D',
        school: 'Collège Saint Michel',
        period: '2010  - 2022',
        location: 'Amparibe, Madagascar',
        description: 'Série scientifique.',
      },
    ],
  },
  experience: {
    title: 'Expérience',
    subtitle: 'Où j\'ai travaillé',
    jobs: [
      {
        role: 'Développeur Fullstack',
        company: 'GeoMadagascar',
        period: 'Avril 2026 - Présent',
        location: 'Antananarivo, Madagascar',
        type: 'Stage',
        tech: ['Symfony', 'PHP', 'PostgreSQL'],
        bullets: [
          'Refonte et modernisation de l\'interface du site ConsoMyZone'
        ],
      },
      {
        role: 'Développeur Odoo',
        company: 'Assurances ARO',
        period: 'Septembre 2025 - Novembre 2025',
        location: 'Antananarivo, Madagascar',
        type: 'Stage',
        tech: ['Odoo 8', 'Python', 'XML', 'PostgreSQL'],
        bullets: [
          'Conception et développement d\'un module de gestion budgétaire custom pour Odoo 8 de zéro.',
          'Mise en place du suivi des dépenses en temps réel avec tableaux de bord comparatifs.',
          'Automatisation des notifications email déclenchées par seuils budgétaires.',
          'Rédaction complète de la documentation technique et fonctionnelle pour transfert.',
        ],
      },
    ],
  },
  cta: {
    title: 'Construisons\nquelque chose.',
    subtitle: 'Ouvert aux opportunités — stages, postes juniors, projets freelance.',
    btnCV: 'Télécharger CV',
    btnContact: 'Me contacter',
    email: 'maheryramahay@gmail.com',
  },
  footer: {
    built: 'Construit avec React, Three.js & trop de café.',
    links: 'GitHub · LinkedIn',
    copy: '© 2026 Mahery Ramahay Mandimby',
  },
};
