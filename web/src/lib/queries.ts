export const NAVIGATION_QUERY = `*[
  _type == "navigation"
][0]{
  navLinks[]{
    label,
    external,
    internal->{
      _id,
      title,
      "slug": slug.current,
      parent->{
        _id,
        "slug": slug.current
      }
    },
    children[]{
      label,
      external,
      internal->{
        _id,
        title,
        "slug": slug.current,
        parent->{
          _id,
          "slug": slug.current
        }
      }
    }
  }
}`;
