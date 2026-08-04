import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Contenu du site',
  type: 'document',
  groups: [
    {name: 'nav', title: 'Navigation'},
    {name: 'hero', title: 'Hero'},
    {name: 'about', title: 'À propos'},
    {name: 'sections', title: 'Titres de sections'},
    {name: 'cta', title: 'CTA / Contact'},
    {name: 'footer', title: 'Footer'},
    {name: 'common', title: 'Commun'},
  ],
  fields: [
    defineField({
      name: 'skipLink',
      title: 'Skip link',
      type: 'localeString',
      group: 'common',
    }),
    defineField({
      name: 'common',
      title: 'Labels communs',
      type: 'object',
      group: 'common',
      fields: [
        defineField({name: 'github', type: 'localeString', title: 'GitHub'}),
        defineField({name: 'gitlab', type: 'localeString', title: 'GitLab'}),
        defineField({name: 'live', type: 'localeString', title: 'Live'}),
      ],
    }),
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      group: 'nav',
      fields: [
        defineField({name: 'about', type: 'localeString', title: 'À propos'}),
        defineField({name: 'projects', type: 'localeString', title: 'Projets'}),
        defineField({name: 'skills', type: 'localeString', title: 'Compétences'}),
        defineField({name: 'education', type: 'localeString', title: 'Formation'}),
        defineField({name: 'experience', type: 'localeString', title: 'Expérience'}),
        defineField({name: 'contact', type: 'localeString', title: 'Contact'}),
        defineField({name: 'downloadCV', type: 'localeString', title: 'Télécharger CV'}),
        defineField({name: 'themeLight', type: 'localeString', title: 'Mode clair'}),
        defineField({name: 'themeDark', type: 'localeString', title: 'Mode sombre'}),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'eyebrow', type: 'localeString', title: 'Eyebrow'}),
        defineField({name: 'available', type: 'localeString', title: 'Disponible'}),
        defineField({name: 'name1', type: 'string', title: 'Prénom'}),
        defineField({name: 'name2', type: 'string', title: 'Nom'}),
        defineField({name: 'cta', type: 'localeString', title: 'CTA projets'}),
        defineField({name: 'ctaContact', type: 'localeString', title: 'CTA contact'}),
        defineField({name: 'scroll', type: 'localeString', title: 'Scroll'}),
        defineField({
          name: 'story',
          title: 'Story cards',
          type: 'object',
          fields: [
            defineField({
              name: 'stack',
              type: 'object',
              fields: [
                defineField({name: 'label', type: 'localeString'}),
                defineField({
                  name: 'items',
                  type: 'array',
                  of: [defineArrayMember({type: 'string'})],
                  options: {layout: 'tags'},
                }),
              ],
            }),
            defineField({
              name: 'cta',
              type: 'object',
              fields: [
                defineField({name: 'label', type: 'localeString'}),
                defineField({name: 'body', type: 'localeText'}),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'À propos',
      type: 'object',
      group: 'about',
      fields: [
        defineField({
          name: 'meta',
          type: 'object',
          fields: [
            defineField({name: 'location', type: 'localeString'}),
            defineField({name: 'email', type: 'localeString'}),
            defineField({name: 'phone', type: 'localeString'}),
            defineField({name: 'github', type: 'localeString'}),
            defineField({name: 'linkedin', type: 'localeString'}),
            defineField({name: 'status', type: 'localeString'}),
          ],
        }),
        defineField({name: 'subtitle', type: 'localeString'}),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphes',
          type: 'array',
          of: [defineArrayMember({type: 'localeText'})],
        }),
        defineField({name: 'location', type: 'string', title: 'Lieu (valeur)'}),
        defineField({name: 'email', type: 'string', title: 'Email (valeur)'}),
        defineField({name: 'phone', type: 'string', title: 'Téléphone (valeur)'}),
        defineField({name: 'github', type: 'string', title: 'GitHub handle'}),
        defineField({name: 'githubUrl', type: 'url', title: 'GitHub URL'}),
        defineField({name: 'linkedin', type: 'string', title: 'LinkedIn nom'}),
        defineField({name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL'}),
        defineField({
          name: 'interests',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString'}),
            defineField({
              name: 'items',
              type: 'array',
              of: [defineArrayMember({type: 'localeString'})],
            }),
          ],
        }),
        defineField({
          name: 'languages',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString'}),
            defineField({
              name: 'items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'lang', type: 'localeString', title: 'Langue'}),
                    defineField({name: 'level', type: 'localeString', title: 'Niveau'}),
                  ],
                  preview: {
                    select: {title: 'lang.fr', subtitle: 'level.fr'},
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'projectsSection',
      title: 'Section Projets',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'subtitle', type: 'localeString'}),
        defineField({name: 'problem', type: 'localeString'}),
        defineField({name: 'result', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'skillsSection',
      title: 'Section Compétences',
      type: 'object',
      group: 'sections',
      fields: [defineField({name: 'subtitle', type: 'localeString'})],
    }),
    defineField({
      name: 'educationSection',
      title: 'Section Formation',
      type: 'object',
      group: 'sections',
      fields: [defineField({name: 'subtitle', type: 'localeString'})],
    }),
    defineField({
      name: 'experienceSection',
      title: 'Section Expérience',
      type: 'object',
      group: 'sections',
      fields: [defineField({name: 'subtitle', type: 'localeString'})],
    }),
    defineField({
      name: 'cta',
      title: 'CTA / Contact',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'title',
          type: 'localeText',
          description: 'Utilise \\n pour un retour à la ligne',
        }),
        defineField({name: 'subtitle', type: 'localeText'}),
        defineField({name: 'btnCV', type: 'localeString'}),
        defineField({name: 'btnContact', type: 'localeString'}),
        defineField({name: 'email', type: 'string'}),
        defineField({name: 'emailAria', type: 'localeString'}),
        defineField({
          name: 'form',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString'}),
            defineField({name: 'name', type: 'localeString'}),
            defineField({name: 'email', type: 'localeString'}),
            defineField({name: 'message', type: 'localeString'}),
            defineField({name: 'send', type: 'localeString'}),
            defineField({name: 'sending', type: 'localeString'}),
            defineField({name: 'captchaRequired', type: 'localeString'}),
            defineField({name: 'success', type: 'localeText'}),
            defineField({name: 'error', type: 'localeText'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({name: 'built', type: 'localeString'}),
        defineField({name: 'backToTop', type: 'localeString'}),
        defineField({
          name: 'copy',
          type: 'localeString',
          description: 'Utilise {year} pour l’année',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contenu du site'}
    },
  },
})
