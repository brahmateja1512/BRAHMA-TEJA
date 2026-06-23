import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paper Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'journal',
      title: 'Journal / Conference Name',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'link',
      title: 'DOI / Link',
      type: 'url',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
    }),
  ],
})
