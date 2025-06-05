import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { definePageSlugField } from "../../utils/slug";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
  description:
    "Create a new page on your website. For example: About, Contact, Ministries, etc.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "This is the main heading that will be shown at the top of the page and in search engines.",
      validation: (Rule) => Rule.required().error("Page title is required"),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Meta Description",
      description:
        "Used for SEO. This summary appears in search engine results.",
      rows: 3,
      validation: (Rule) => [
        Rule.min(140).warning("At least 140 characters is best for SEO."),
        Rule.max(160).warning("Keep under 160 characters to avoid truncation."),
      ],
    }),
    definePageSlugField(), // includes createPageSlug and isUniqueSlug
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Select a parent page if this is a subpage (e.g. Youth under Ministries).",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value || !value._ref) return true;
          const { document, getClient } = context;
          if (!document) return true;

          const client = getClient({ apiVersion: "2023-05-03" });
          if (value._ref === document._id) {
            return "A page cannot be its own parent";
          }

          const checkCircular = async (
            parentId: string,
            originalId: string
          ): Promise<boolean> => {
            const parent = await client.fetch(
              `*[_id == $parentId][0]{_id, parent}`,
              { parentId }
            );
            if (!parent) return false;
            if (parent.parent?._ref === originalId) return true;
            if (parent.parent?._ref) {
              return await checkCircular(parent.parent._ref, originalId);
            }
            return false;
          };

          const isCircular = await checkCircular(value._ref, document._id);
          if (isCircular) {
            return "This would create a circular reference";
          }

          return true;
        }),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Social Sharing Image",
      description:
        "This image will be used when the page is shared on social media.",
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      parentSlug: "parent.slug.current",
      parentTitle: "parent.title",
      media: "image",
    },
    prepare({ title, slug, parentSlug, parentTitle, media }) {
      const fullPath = parentSlug ? `/${parentSlug}/${slug}` : `/${slug}`;
      const subtitle = parentTitle
        ? `🌐 garden.church${fullPath} (child of ${parentTitle})`
        : `🌐 garden.church${fullPath}`;

      return {
        title: title || "Untitled Page",
        subtitle,
        media,
      };
    },
  },
});
