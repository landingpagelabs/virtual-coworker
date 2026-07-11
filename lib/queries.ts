export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  description,
  sections[]{
    ...
  }
}`;
