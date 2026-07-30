import {defineField, defineType} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Texte long (FR / EN)',
  type: 'object',
  fields: [
    defineField({name: 'fr', title: 'Français', type: 'text', rows: 4}),
    defineField({name: 'en', title: 'English', type: 'text', rows: 4}),
  ],
})
