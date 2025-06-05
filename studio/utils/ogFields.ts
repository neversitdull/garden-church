import { defineField } from "sanity";
import { GROUP } from "./constants";

export const ogFields = [
  defineField({
    name: "ogTitle",
    type: "string",
    title: "Open Graph Title",
    group: GROUP.OG,
    description:
      "Used when sharing this page on social platforms. Falls back to SEO title.",
  }),
  defineField({
    name: "ogDescription",
    type: "text",
    title: "Open Graph Description",
    rows: 3,
    group: GROUP.OG,
    description:
      "Used when sharing this page on social platforms. Falls back to SEO description.",
  }),
  defineField({
    name: "ogImage",
    type: "image",
    title: "Open Graph Image",
    group: GROUP.OG,
    options: { hotspot: true },
    description:
      "Image shown when sharing this page on Facebook, Twitter, etc.",
  }),
];
