import type { SlugifierFn } from "sanity";
import {
  defineField,
  getDraftId,
  getPublishedId,
  type FieldDefinition,
  type SlugValidationContext,
} from "sanity";
import slugify from "slugify";

// Hardcoded slugs for special cases
const slugMapper: Record<string, string> = {
  home: "/", // "Home" page slug becomes "/"
  ministries: "/ministries", // Optional: static section
};

// Ensure slug is unique (excludes draft and published versions of current doc)
export async function isUniqueSlug(
  slug: string,
  context: SlugValidationContext
): Promise<boolean> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2023-05-03" });
  const id = getPublishedId(document?._id ?? "");
  const draftId = getDraftId(id);

  const params = { slug, draftId, publishedId: id };
  const query = `*[
    !(_id in [$draftId, $publishedId]) &&
    slug.current == $slug
  ]`;

  const result = await client.fetch(query, params);
  return result.length === 0;
}

// Slug generator
export const createPageSlug: SlugifierFn = (input, _, { parent }) => {
  const rawSlug = slugify(input, {
    lower: true,
    remove: /[^a-zA-Z0-9\s-]/g,
  });

  if (slugMapper[rawSlug]) {
    return slugMapper[rawSlug];
  }

  return rawSlug;
};

// Wrapper for defining a consistent slug field
export function definePageSlugField(): FieldDefinition<"slug"> {
  return defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: {
      source: "title",
      slugify: createPageSlug,
      isUnique: isUniqueSlug,
    },
    validation: (Rule) =>
      Rule.required().error("Slug is required for the page URL"),
  });
}
