export const fr = {
  lang: 'fr',
  skipLink: 'Aller au contenu',
  common: {
    github: 'GitHub ↗',
    gitlab: 'GitLab ↗',
    live: 'Live ↗',
  },
  nav: {
    about: 'À Propos',
    projects: 'Projets',
    skills: 'Compétences',
    education: 'Formation',
    experience: 'Expérience',
    contact: 'Contact',
    downloadCV: 'Télécharger CV',
    themeLight: 'Mode clair',
    themeDark: 'Mode sombre',
  },
  hero: {
    eyebrow: 'Développeur Fullstack',
    available: 'Disponible',
    name1: 'Mahery',
    name2: 'Ramahay',
    description:
      "Je construis en apprenant — et j'apprends en construisant.",
    cta: 'Voir mes projets',
    ctaContact: 'Me contacter',
    marquee: ['Spring Boot', 'Node.js', 'Symfony', 'React', 'Angular', 'Odoo'],
    scroll: 'défiler',
    photoAlt: 'Portrait de Mahery Ramahay',
    story: {
      stack: {
        label: 'Stack principale',
        title: 'Ce avec quoi je construis',
        items: ['React', 'Spring Boot', 'PostgreSQL', 'GitHub'],
      },
      intent: {
        label: 'Approche',
        title: 'Apprendre vite. Livrer propre.',
        body:
          'Fullstack, curieux et adaptable — je préfère comprendre le problème avant de coder la solution.',
      },
      cta: {
        label: 'Ensuite',
        title: 'On continue ?',
        body: 'Parcours mes projets, ou écris-moi directement.',
      },
    },
  },
  about: {
    meta: {
      location: 'Lieu',
      email: 'Email',
      phone: 'Téléphone',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      status: 'Statut',
    },
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
    github: 'MaheryJeremie',
    githubUrl: 'https://github.com/MaheryJeremie',
    linkedin: 'Mahery Ramahay Mandimby',
    linkedinUrl: 'https://www.linkedin.com/in/mahery-ramahay-mandimby-823b6b315/',
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
  },
  projects: {
    title: 'Projets',
    subtitle: 'Ce que j\'ai construit',
    featured: 'À la une',
    problem: 'Problème',
    result: 'Résultat',
    items: [
      {
        name: 'Application Centre Commercial',
        problem:
          'Un centre commercial style Akoor a besoin d’un outil unique pour admin, commerçants et clients, sans multiplier les canaux de gestion.',
        result:
          'App multi-rôles : admin (utilisateurs, commerces, événements), commerçants (boutique, promotions) et clients (boutiques, avis, favoris).',
        tech: ['Node.js', 'Express', 'Angular', 'MongoDB'],
        github: 'https://gitlab.com/MaheryJeremie/m1p13mean-rehareha-mahery',
        live: 'https://m1p13mean-rehareha-mahery.netlify.app/',
        highlight: true,
        tag: 'Projet académique',
        image: '/images/projects/shopping-centre.webp',
        imageAlt: 'Aperçu Application Centre Commercial',
      },
      {
        name: 'Module Gestion Budgétaire (Odoo)',
        problem:
          'Le module de gestion de budget d’Odoo 8 ne répondait pas aux besoins de l’entreprise d’accueil.',
        result:
          'Module sur mesure : planification budgétaire, suivi des dépenses, analyse comparative, tableau de bord et notifications automatiques.',
        tech: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
        github: 'https://github.com/MaheryJeremie/Gestion-budgetaire',
        live: null,
        highlight: true,
        tag: 'Projet de Licence',
        image: '/images/projects/odoo-budget.webp',
        imageAlt: 'Aperçu Module Gestion Budgétaire Odoo',
      },
      {
        name: 'AI Study Assistant',
        problem:
          'Les PDF longs sont difficiles à étudier : on perd du temps à relire, résumer et vérifier qu’on a bien retenu.',
        result:
          'Plateforme qui transforme les PDF en outils d’étude IA : résumé, chat RAG avec sources, quiz, flashcards et suivi de progression.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'JWT', 'RAG'],
        live: '',
        highlight: true,
        tag: 'Projet personnel',
        image: '/images/projects/ai-study-assistant.webp',
        imageAlt: 'Aperçu AI Study Assistant',
      },
      {
        name: 'AsaFinder',
        problem:
          'Les offres sont dispersées sur plusieurs plateformes, ce qui rend la recherche difficile.',
        result:
          'Une seule recherche pour trouver les offres adaptées, sans jongler entre les sites.',
        tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
        github: 'https://github.com/MaheryJeremie/job-finder',
        live: null,
        highlight: true,
        tag: 'Projet personnel',
        image: '/images/projects/asafinder.webp',
        imageAlt: 'Aperçu AsaFinder',
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
        items: ['React', 'Angular', 'React Native', 'Bootstrap'],
      },
      {
        key: 'backend',
        label: 'Backend',
        items: ['Spring Boot', 'Node.js', 'Symfony', '.NET', 'Odoo'],
      },
      {
        key: 'languages',
        label: 'Langages',
        items: ['Java', 'PHP', 'Python', 'JavaScript', 'C', 'C#'],
      },
      {
        key: 'database',
        label: 'Bases de données',
        items: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB'],
      },
      {
        key: 'tools',
        label: 'Outils',
        items: ['Gitlab / GitHub', 'Docker', 'Firebase', 'Photoshop'],
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
        period: '2010 — 2022',
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
        period: 'Avril 2026 - Juillet 2026',
        location: 'Antananarivo, Madagascar',
        type: 'Stage',
        tech: ['Symfony', 'PHP', 'PostgreSQL'],
        bullets: [
          'Refonte et modernisation de l\'interface du site ConsoMyZone.',
          'Optimisation de certaines fonctions métiers pour améliorer les performances et l\'expérience utilisateur.',
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
    subtitle:
      'Ouvert aux opportunités — stages, CDI, projets freelance.',
    btnCV: 'Télécharger CV',
    btnContact: 'Me contacter',
    email: 'maheryramahay@gmail.com',
    emailAria: 'Envoyer un email à maheryramahay@gmail.com — ouvre votre application mail',
    form: {
      title: 'Envoyer un message',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi…',
      captchaRequired: 'Valide le captcha avant d’envoyer.',
      success: 'Message envoyé — je te réponds rapidement.',
      error: 'Une erreur est survenue. Utilise le bouton email ci-dessus.',
    },
  },
  footer: {
    built: 'Oser c\'est faire.',
    links: 'GitHub · LinkedIn',
    backToTop: 'Retour en haut',
    copy: '© {year} Mahery Ramahay Mandimby',
  },
};
