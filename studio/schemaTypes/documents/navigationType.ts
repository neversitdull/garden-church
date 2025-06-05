import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one navigation link is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Navigation",
        description:
          "Navigation configuration for the links that appear in the main navigation menu",
      };
    },
  },
});
