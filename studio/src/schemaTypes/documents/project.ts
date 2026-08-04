import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'Problème',
      type: 'localeText',
    }),
    defineField({
      name: 'result',
      title: 'Résultat',
      type: 'localeText',
    }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'github',
      title: 'GitHub / GitLab',
      type: 'url',
    }),
    defineField({
      name: 'live',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imagePath',
      title: 'Chemin image local (fallback)',
      type: 'string',
      description: 'Ex: /images/projects/asafinder.webp — utilisé si aucune image Sanity',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texte alternatif',
      type: 'localeString',
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name.fr',
      subtitle: 'tag.fr',
      media: 'image',
      order: 'order',
    },
    prepare({title, subtitle, media, order}) {
      return {
        title: title || 'Sans nom',
        subtitle: [order != null ? `#${order}` : null, subtitle].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
