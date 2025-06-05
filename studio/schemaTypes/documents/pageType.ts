import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for page URL'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'No slug set',
      }
    },
  },
})
