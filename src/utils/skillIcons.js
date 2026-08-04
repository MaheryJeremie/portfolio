const SKILL_ICON_SLUGS = {
  React: 'react',
  Angular: 'angular',
  'React Native': 'react',
  Bootstrap: 'bootstrap',
  'Spring Boot': 'springboot',
  'Node.js': 'nodedotjs',
  Symfony: 'symfony',
  '.NET': 'dotnet',
  Odoo: 'odoo',
  Java: 'openjdk',
  PHP: 'php',
  Python: 'python',
  JavaScript: 'javascript',
  C: 'c',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Firebase: 'firebase',
  'Gitlab / GitHub': 'github',
  GitHub: 'github',
  Docker: 'docker',
};

/** Devicon — https://github.com/devicons/devicon */
const DEVICON_ICONS = {
  'C#': 'csharp/csharp-plain',
  Oracle: 'oracle/oracle-original',
  Photoshop: 'photoshop/photoshop-plain',
};

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';

export function getSkillIcon(name, color = '8FA3C4') {
  const hex = color.replace('#', '');
  const deviconPath = DEVICON_ICONS[name];
  if (deviconPath) {
    return {
      type: 'cdn',
      src: `${DEVICON_CDN}/${deviconPath}.svg`,
      tinted: true,
      color: hex,
    };
  }

  const slug = SKILL_ICON_SLUGS[name];
  if (!slug) return null;

  return {
    type: 'cdn',
    src: `https://cdn.simpleicons.org/${slug}/${hex}`,
  };
}
