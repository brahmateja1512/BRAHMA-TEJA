import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Global Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Global SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Global SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'experienceHeroText',
      title: 'Experience Page Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Forwarding Email (For Inquiries)',
      type: 'string',
    }),
  ],
})
