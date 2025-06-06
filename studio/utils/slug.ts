import type { SlugifierFn } from "sanity";
import { getDraftId, getPublishedId, type SlugValidationContext } from "sanity";
import slugify from "slugify";

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

export const getDocTypePrefix = (type: string) => {
  if (["page"].includes(type)) return "";
  return type;
};

const slugMapper = {
  homePage: "/",
} as Record<string, string>;
// Slug generator

export const createSlug: SlugifierFn = (input, _, { parent }) => {
  const { _type } = parent as {
    _type: string;
  };

  if (slugMapper[_type]) return slugMapper[_type];

  const prefix = getDocTypePrefix(_type);

  const slug = slugify(input, {
    lower: true,
    remove: /[^a-zA-Z0-9/ ]/g,
  });

  return `/${[prefix, slug].filter(Boolean).join("/")}`;
};
