import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inquiry',
  title: 'Inquiries (Inbox)',
  type: 'document',
  readOnly: true, // CRM Inbox style: read-only in studio
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Sender Email',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
