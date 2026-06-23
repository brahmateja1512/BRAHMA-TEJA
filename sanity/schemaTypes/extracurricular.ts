import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'extracurricular',
  title: 'Extracurricular Activities',
  type: 'document',
  fields: [
    defineField({
      name: 'activity',
      title: 'Activity Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
