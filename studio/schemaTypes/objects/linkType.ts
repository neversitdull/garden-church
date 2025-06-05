import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().error("Link label is required"),
    }),
    defineField({
      name: "internal",
      title: "Internal Page",
      type: "reference",
      to: [{ type: "page" }],
    }),
    defineField({
      name: "external",
      title: "External URL",
      type: "url",
    }),
    defineField({
      name: "children",
      title: "Nested Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) =>
      fields && (fields.internal || fields.external)
        ? true
        : "Must set either an internal or external link"
    ),
  preview: {
    select: {
      title: "label",
      internal: "internal.slug.current",
      external: "external",
    },
    prepare({ title, internal, external }) {
      return {
        title,
        subtitle: internal ? `/${internal}` : external || "—",
      };
    },
  },
});
