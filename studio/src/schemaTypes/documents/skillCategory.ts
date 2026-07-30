import {defineArrayMember, defineField, defineType} from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Catégorie de compétences',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Clé',
      type: 'string',
      description: 'Ex: frontend, backend, tools',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Compétences',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
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
      title: 'label.fr',
      subtitle: 'key',
      order: 'order',
    },
    prepare({title, subtitle, order}) {
      return {
        title: title || subtitle || 'Sans titre',
        subtitle: [order != null ? `#${order}` : null, subtitle].filter(Boolean).join(' · '),
      }
    },
  },
})
