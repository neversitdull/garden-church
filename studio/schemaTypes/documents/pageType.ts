import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";
import { PathnameFieldComponent } from "../../components/pathNameField";
import { GROUP, GROUPS } from "../../utils/constants";
import { ogFields } from "../../utils/ogFields";
import { seoFields } from "../../utils/seoFields";
import { isUniqueSlug } from "../../utils/slug";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: PanelTop,
  description:
    "Create a new page on your website. For example: About, Contact, Ministries, etc.",
  groups: GROUPS,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "page" }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.CONTENT,
      description:
        "This is the main heading that will be shown at the top of the page and in search engines.",
      validation: (Rule) => Rule.required().error("Page title is required"),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Meta Description",
      group: GROUP.CONTENT,
      description:
        "Used for SEO. This summary appears in search engine results.",
      rows: 3,
      validation: (Rule) => [
        Rule.min(140).warning("At least 140 characters is best for SEO."),
        Rule.max(160).warning("Keep under 160 characters to avoid truncation."),
      ],
    }),
    defineField({
      name: "parent",
      title: "Parent Page",
      type: "reference",
      group: GROUP.CONTENT,
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
      name: "slug",
      title: "Slug",
      type: "slug",
      group: GROUP.CONTENT,
      components: {
        field: PathnameFieldComponent,
      },
      options: {
        source: "title",
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9-]/g, ""),
        isUnique: isUniqueSlug, // your uniqueness validator
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Social Sharing Image",
      group: GROUP.CONTENT,
      description:
        "A main image for sharing on social media or within search engine results.",
      options: {
        hotspot: true,
      },
    }),
    ...seoFields,
    ...ogFields,
  ],

  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      fullSlug: "fullSlug",
      media: "image",
    },
    prepare({ title, slug, fullSlug, media }) {
      const displayPath = fullSlug || `/${slug}`;
      const subtitle = `garden.church${displayPath}`;

      return {
        title: title || "Untitled Page",
        subtitle,
        media,
      };
    },
  },
});
