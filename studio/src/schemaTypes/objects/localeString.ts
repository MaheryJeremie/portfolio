import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte (FR / EN)',
  type: 'object',
  fields: [
    defineField({name: 'fr', title: 'Français', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
  ],
})
