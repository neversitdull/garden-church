import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "k4pfgwt6",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-03",
});
