// Utility function to build URLs for navigation items
export function buildUrl(link: any): string {
  if (link.external) {
    return link.external;
  }

  if (link.internal?.slug) {
    // Build the full path for nested pages
    const buildFullPath = (page: any): string => {
      if (page.parent?.slug) {
        return `${buildFullPath(page.parent)}/${page.slug}`;
      }
      return `/${page.slug}`;
    };

    return buildFullPath(link.internal);
  }

  return "#";
}

// Type definitions for navigation data
export interface NavigationLink {
  label: string;
  external?: string;
  internal?: {
    _id: string;
    title: string;
    slug: string;
    parent?: {
      _id: string;
      slug: string;
    };
  };
  children?: NavigationLink[];
}

export interface NavigationData {
  navLinks: NavigationLink[];
}
