import {defineArrayMember, defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Expérience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Poste',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Période',
      type: 'localeString',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'localeString',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'localeString',
      description: 'Ex: Stage / Internship',
    }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'bullets',
      title: 'Points clés',
      type: 'array',
      of: [defineArrayMember({type: 'localeText'})],
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
      title: 'role.fr',
      subtitle: 'company',
      order: 'order',
    },
    prepare({title, subtitle, order}) {
      return {
        title: title || 'Sans titre',
        subtitle: [order != null ? `#${order}` : null, subtitle].filter(Boolean).join(' · '),
      }
    },
  },
})
