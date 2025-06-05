export const GROUP = {
  CONTENT: "content",
  SEO: "seo",
  OG: "og",
};

export const GROUPS = [
  { name: GROUP.CONTENT, title: "Content", default: true, icon: () => "📝" },
  { name: GROUP.SEO, title: "SEO", icon: () => "🔍" },
  { name: GROUP.OG, title: "Open Graph", icon: () => "📱" },
];
