import { defineField } from "sanity";
import { GROUP } from "./constants";

export const seoFields = [
  defineField({
    name: "seoTitle",
    type: "string",
    title: "SEO Title",
    group: GROUP.SEO,
    description:
      "Overrides the page title for SEO. Falls back to title if unset.",
  }),
  defineField({
    name: "seoDescription",
    type: "text",
    title: "SEO Description",
    rows: 3,
    group: GROUP.SEO,
    description:
      "Overrides the page description for SEO. Falls back to description if unset.",
  }),
  defineField({
    name: "seoNoIndex",
    type: "boolean",
    title: "Hide from search engines (noindex)",
    group: GROUP.SEO,
    initialValue: false,
    description: "If true, this page will not be indexed by search engines.",
  }),
  defineField({
    name: "seoHideFromLists",
    type: "boolean",
    title: "Hide from navigation/sitemaps",
    group: GROUP.SEO,
    initialValue: false,
    description: "If true, this page will be excluded from nav and sitemap.",
  }),
];
