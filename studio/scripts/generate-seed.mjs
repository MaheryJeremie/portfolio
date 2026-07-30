/**
 * Seed Sanity with current portfolio content (FR + EN).
 * Run from studio/: npx sanity dataset import seed.ndjson production
 *
 * Or regenerate this file: node scripts/generate-seed.mjs
 */
import {writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const L = (fr, en) => ({_type: 'localeString', fr, en})
const T = (fr, en) => ({_type: 'localeText', fr, en})

const docs = []

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  skipLink: L('Aller au contenu', 'Skip to content'),
  common: {
    github: L('GitHub ↗', 'GitHub ↗'),
    gitlab: L('GitLab ↗', 'GitLab ↗'),
    live: L('Live ↗', 'Live ↗'),
  },
  nav: {
    about: L('À Propos', 'About'),
    projects: L('Projets', 'Projects'),
    skills: L('Compétences', 'Skills'),
    education: L('Formation', 'Education'),
    experience: L('Expérience', 'Experience'),
    contact: L('Contact', 'Contact'),
    downloadCV: L('Télécharger CV', 'Download CV'),
    themeLight: L('Mode clair', 'Light mode'),
    themeDark: L('Mode sombre', 'Dark mode'),
  },
  hero: {
    eyebrow: L('Développeur Fullstack', 'Fullstack Developer'),
    available: L('Disponible', 'Available'),
    name1: 'Mahery',
    name2: 'Ramahay',
    description: T(
      "Je construis en apprenant — et j'apprends en construisant.",
      'I build while learning — and I learn by building.',
    ),
    cta: L('Voir mes projets', 'See my work'),
    ctaContact: L('Me contacter', 'Get in touch'),
    marquee: ['Spring Boot', 'Node.js', 'Symfony', 'React', 'Angular', 'Odoo'],
    scroll: L('défiler', 'scroll'),
    photoAlt: L('Portrait de Mahery Ramahay', 'Portrait of Mahery Ramahay'),
    story: {
      stack: {
        label: L('Stack principale', 'Core stack'),
        title: L('Ce avec quoi je construis', 'What I build with'),
        items: ['React', 'Spring Boot', 'PostgreSQL', 'GitHub'],
      },
      intent: {
        label: L('Approche', 'Approach'),
        title: L('Apprendre vite. Livrer propre.', 'Learn fast. Ship clean.'),
        body: T(
          'Fullstack, curieux et adaptable — je préfère comprendre le problème avant de coder la solution.',
          'Fullstack, curious and adaptable — I understand the problem before writing the fix.',
        ),
      },
      cta: {
        label: L('Ensuite', 'Next'),
        title: L('On continue ?', 'Shall we continue?'),
        body: T(
          'Parcours mes projets, ou écris-moi directement.',
          'Browse my projects, or just reach out.',
        ),
      },
    },
  },
  about: {
    meta: {
      location: L('Lieu', 'Location'),
      email: L('Email', 'Email'),
      phone: L('Téléphone', 'Phone'),
      github: L('GitHub', 'GitHub'),
      linkedin: L('LinkedIn', 'LinkedIn'),
      status: L('Statut', 'Status'),
    },
    title: L('À Propos', 'About'),
    subtitle: L('Le dev derrière le terminal', 'The dev behind the terminal'),
    paragraphs: [
      T("Le code, c’est une histoire de famille.", 'Code runs in the family.'),
      T(
        "Petit, je regardais mon père travailler sur son écran. Je ne comprenais pas grand-chose à ces lignes qui défilaient, mais je savais déjà que c'est là que la magie opérait. J’ai baigné dans cet univers de manière indirecte pendant des années, alors choisir le développement n'a pas été une surprise, mais une évidence.",
        "Growing up, I watched my father work at his screen. I didn't understand much of those scrolling lines, but I already knew that's where the magic happened. I was immersed in that world indirectly for years, so choosing development wasn't a surprise — it was inevitable.",
      ),
      T(
        "En m’y mettant moi-même, la curiosité est devenue une passion. Aujourd’hui diplômé, je lance ma carrière avec l’envie de construire mes propres solutions, tout en continuant mes études pour aller encore plus loin.",
        "Once I started myself, curiosity became passion. Now graduated, I'm launching my career with the drive to build my own solutions, while continuing my studies to go even further.",
      ),
    ],
    location: 'Antananarivo, Madagascar',
    email: 'maheryramahay@gmail.com',
    phone: '+261 38 72 721 78',
    github: 'MaheryJeremie',
    githubUrl: 'https://github.com/MaheryJeremie',
    linkedin: 'Mahery Ramahay Mandimby',
    linkedinUrl: 'https://www.linkedin.com/in/mahery-ramahay-mandimby-823b6b315/',
    interests: {
      title: L("Centres d'intérêt", 'Interests'),
      items: [
        L('Musique', 'Music'),
        L('Jeux Vidéo', 'Video Games'),
        L('Produits Tech', 'Tech Products'),
      ],
    },
    languages: {
      title: L('Langues', 'Languages'),
      items: [
        {lang: L('Malgache', 'Malagasy'), level: L('Langue maternelle', 'Native')},
        {lang: L('Français', 'French'), level: L('Courant', 'Fluent')},
        {lang: L('Anglais', 'English'), level: L('Intermédiaire', 'Intermediate')},
      ],
    },
  },
  projectsSection: {
    title: L('Projets', 'Projects'),
    subtitle: L("Ce que j'ai construit", 'Things I shipped'),
    featured: L('À la une', 'Featured'),
    problem: L('Problème', 'Problem'),
    result: L('Résultat', 'Result'),
  },
  skillsSection: {
    title: L('Compétences', 'Skills'),
    subtitle: L('Ma stack technique', 'My technical stack'),
  },
  educationSection: {
    title: L('Formation', 'Education'),
    subtitle: L('Mon parcours académique', 'My academic background'),
  },
  experienceSection: {
    title: L('Expérience', 'Experience'),
    subtitle: L("Où j'ai travaillé", "Where I've worked"),
  },
  cta: {
    title: T('Construisons\nquelque chose.', "Let's build\nsomething."),
    subtitle: T(
      'Ouvert aux opportunités — stages, CDI, projets freelance.',
      'Open to opportunities — internships, full-time roles, freelance projects.',
    ),
    btnCV: L('Télécharger CV', 'Download CV'),
    btnContact: L('Me contacter', 'Get in touch'),
    email: 'maheryramahay@gmail.com',
    emailAria: L(
      'Envoyer un email à maheryramahay@gmail.com — ouvre votre application mail',
      'Send an email to maheryramahay@gmail.com — opens your mail app',
    ),
    form: {
      title: L('Envoyer un message', 'Send a message'),
      name: L('Nom', 'Name'),
      email: L('Email', 'Email'),
      message: L('Message', 'Message'),
      send: L('Envoyer', 'Send message'),
      sending: L('Envoi…', 'Sending…'),
      success: T(
        'Message envoyé — je te réponds rapidement.',
        "Message sent — I'll get back to you soon.",
      ),
      error: T(
        'Une erreur est survenue. Utilise le bouton email ci-dessus.',
        'Something went wrong. Try the email button above.',
      ),
    },
  },
  footer: {
    built: L("Oser c'est faire.", 'To dare is to do.'),
    links: L('GitHub · LinkedIn', 'GitHub · LinkedIn'),
    backToTop: L('Retour en haut', 'Back to top'),
    copy: L('© {year} Mahery Ramahay Mandimby', '© {year} Mahery Ramahay Mandimby'),
  },
})

const projects = [
  {
    id: 'project-shopping-centre',
    order: 0,
    name: L('Application Centre Commercial', 'Shopping Centre App'),
    problem: T(
      'Un centre commercial style Akoor a besoin d’un outil unique pour admin, commerçants et clients, sans multiplier les canaux de gestion.',
      'An Akoor-style shopping centre needed one shared tool for admins, merchants, and clients — without juggling separate systems.',
    ),
    result: T(
      'App multi-rôles : admin (utilisateurs, commerces, événements), commerçants (boutique, promotions) et clients (boutiques, avis, favoris).',
      'Multi-role app: admin (users, shops, events), merchants (store info, promotions), and clients (listings, reviews, favourites).',
    ),
    tech: ['Node.js', 'Express', 'Angular', 'MongoDB'],
    github: 'https://gitlab.com/MaheryJeremie/m1p13mean-rehareha-mahery',
    live: 'https://m1p13mean-rehareha-mahery.netlify.app/',
    highlight: true,
    tag: L('Projet académique', 'Academic project'),
    imagePath: '/images/projects/shopping-centre.webp',
    imageAlt: L('Aperçu Application Centre Commercial', 'Shopping Centre App preview'),
  },
  {
    id: 'project-odoo-budget',
    order: 1,
    name: L('Module Gestion Budgétaire (Odoo)', 'Budget Management Module (Odoo)'),
    problem: T(
      'Le module de gestion de budget d’Odoo 8 ne répondait pas aux besoins de l’entreprise d’accueil.',
      'Odoo 8’s built-in budget management module did not meet the needs of the host company.',
    ),
    result: T(
      'Module sur mesure : planification budgétaire, suivi des dépenses, analyse comparative, tableau de bord et notifications automatiques.',
      'Custom module: budget planning, expense tracking, comparative analysis, dashboard, and automated notifications.',
    ),
    tech: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
    github: 'https://github.com/MaheryJeremie/Gestion-budgetaire',
    highlight: true,
    tag: L('Projet de Licence', 'Degree project'),
    imagePath: '/images/projects/odoo-budget.webp',
    imageAlt: L('Aperçu Module Gestion Budgétaire Odoo', 'Odoo Budget Management module preview'),
  },
  {
    id: 'project-ai-study',
    order: 2,
    name: L('AI Study Assistant', 'AI Study Assistant'),
    problem: T(
      'Les PDF longs sont difficiles à étudier : on perd du temps à relire, résumer et vérifier qu’on a bien retenu.',
      'Long PDFs are hard to study: you waste time rereading, summarising, and checking what stuck.',
    ),
    result: T(
      'Plateforme qui transforme les PDF en outils d’étude IA : résumé, chat RAG avec sources, quiz, flashcards et suivi de progression.',
      'A platform that turns PDFs into AI study tools: summary, sourced RAG chat, quizzes, flashcards, and progress tracking.',
    ),
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'JWT', 'RAG'],
    highlight: true,
    tag: L('Projet personnel', 'Personal project'),
    imagePath: '/images/projects/ai-study-assistant.webp',
    imageAlt: L('Aperçu AI Study Assistant', 'AI Study Assistant preview'),
  },
  {
    id: 'project-asafinder',
    order: 3,
    name: L('AsaFinder', 'AsaFinder'),
    problem: T(
      'Les offres sont dispersées sur plusieurs plateformes, ce qui rend la recherche difficile.',
      'Job offers are scattered across multiple platforms, which makes searching difficult.',
    ),
    result: T(
      'Une seule recherche pour trouver les offres adaptées, sans jongler entre les sites.',
      'One search to find matching offers — without juggling between sites.',
    ),
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/MaheryJeremie/job-finder',
    highlight: true,
    tag: L('Projet personnel', 'Personal project'),
    imagePath: '/images/projects/asafinder.webp',
    imageAlt: L('Aperçu AsaFinder', 'AsaFinder preview'),
  },
]

for (const p of projects) {
  docs.push({
    _id: p.id,
    _type: 'project',
    name: p.name,
    problem: p.problem,
    result: p.result,
    tech: p.tech,
    github: p.github || undefined,
    live: p.live || undefined,
    highlight: p.highlight,
    tag: p.tag,
    imagePath: p.imagePath,
    imageAlt: p.imageAlt,
    order: p.order,
  })
}

docs.push(
  {
    _id: 'experience-geomadagascar',
    _type: 'experience',
    order: 0,
    role: L('Développeur Fullstack', 'Fullstack Developer'),
    company: 'GeoMadagascar',
    period: L('Avril 2026 - Juillet 2026', 'April 2026 - July 2026'),
    location: L('Antananarivo, Madagascar', 'Antananarivo, Madagascar'),
    type: L('Stage', 'Internship'),
    tech: ['Symfony', 'PHP', 'PostgreSQL'],
    bullets: [
      T(
        "Refonte et modernisation de l'interface du site ConsoMyZone.",
        'Redesign and modernisation of the ConsoMyZone website interface.',
      ),
      T(
        "Optimisation de certaines fonctions métiers pour améliorer les performances et l'expérience utilisateur.",
        'Optimisation of key business functions to improve performance and user experience.',
      ),
    ],
  },
  {
    _id: 'experience-aro',
    _type: 'experience',
    order: 1,
    role: L('Développeur Odoo', 'Odoo Developer'),
    company: 'Assurances ARO',
    period: L('Septembre 2025 - Novembre 2025', 'September 2025 - November 2025'),
    location: L('Antananarivo, Madagascar', 'Antananarivo, Madagascar'),
    type: L('Stage', 'Internship'),
    tech: ['Odoo 8', 'Python', 'XML', 'PostgreSQL'],
    bullets: [
      T(
        "Conception et développement d'un module de gestion budgétaire custom pour Odoo 8 de zéro.",
        'Designed and built a custom budget management module for Odoo 8 from scratch.',
      ),
      T(
        'Mise en place du suivi des dépenses en temps réel avec tableaux de bord comparatifs.',
        'Implemented real-time expense tracking with comparative analysis dashboards.',
      ),
      T(
        'Automatisation des notifications email déclenchées par seuils budgétaires.',
        'Set up automated email notifications triggered by budget threshold events.',
      ),
      T(
        'Rédaction complète de la documentation technique et fonctionnelle pour transfert.',
        'Wrote full technical and functional documentation for handover.',
      ),
    ],
  },
)

docs.push(
  {
    _id: 'education-m1',
    _type: 'education',
    order: 0,
    degree: L('Master 1 — Informatique', 'Master 1 — Computer Science'),
    school: 'IT University',
    period: L('Janvier 2026 — Présent', 'January 2026 — Present'),
    location: L('Andoharanofotsy, Madagascar', 'Andoharanofotsy, Madagascar'),
    description: T('Tronc commun.', 'Common core curriculum.'),
  },
  {
    _id: 'education-licence',
    _type: 'education',
    order: 1,
    degree: L('Licence — Informatique', "Bachelor's Degree — Computer Science"),
    school: 'IT University',
    period: L('Septembre 2022 — Décembre 2025', 'September 2022 — December 2025'),
    location: L('Andoharanofotsy, Madagascar', 'Andoharanofotsy, Madagascar'),
    description: T('Option développement.', 'Development track.'),
  },
  {
    _id: 'education-bac',
    _type: 'education',
    order: 2,
    degree: L('Baccalauréat — Série D', 'High School Diploma (Baccalauréat) — Science'),
    school: 'Collège Saint Michel',
    period: L('2010 — 2022', '2010 — 2022'),
    location: L('Amparibe, Madagascar', 'Amparibe, Madagascar'),
    description: T('Série scientifique.', 'Science track.'),
  },
)

const skillCats = [
  {id: 'skill-frontend', order: 0, key: 'frontend', label: L('Frontend', 'Frontend'), items: ['React', 'Angular', 'React Native', 'Bootstrap']},
  {id: 'skill-backend', order: 1, key: 'backend', label: L('Backend', 'Backend'), items: ['Spring Boot', 'Node.js', 'Symfony', '.NET', 'Odoo']},
  {id: 'skill-languages', order: 2, key: 'languages', label: L('Langages', 'Languages'), items: ['Java', 'PHP', 'Python', 'JavaScript', 'C', 'C#']},
  {id: 'skill-database', order: 3, key: 'database', label: L('Bases de données', 'Databases'), items: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB']},
  {id: 'skill-tools', order: 4, key: 'tools', label: L('Outils', 'Tools'), items: ['Gitlab / GitHub', 'Docker', 'Firebase', 'Photoshop']},
]

for (const s of skillCats) {
  docs.push({
    _id: s.id,
    _type: 'skillCategory',
    key: s.key,
    label: s.label,
    items: s.items,
    order: s.order,
  })
}

const out = join(__dirname, '..', 'seed.ndjson')
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`Wrote ${docs.length} documents to ${out}`)
