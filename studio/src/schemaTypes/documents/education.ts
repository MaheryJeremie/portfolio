import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Formation',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Diplôme',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'school',
      title: 'École',
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
      name: 'description',
      title: 'Description',
      type: 'localeText',
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
      title: 'degree.fr',
      subtitle: 'school',
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
