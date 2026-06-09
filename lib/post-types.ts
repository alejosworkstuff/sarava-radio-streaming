export type PostEntry = {
  slug: string;
  title: string;
  author: string;
  date: string;
  displayDate: string;
  excerpt: string;
  tags: string[];
  image: string;
};

export type PostFormValues = Omit<PostEntry, "slug"> & {
  slug?: string;
  tagsInput: string;
};

export const EMPTY_POST_FORM: PostFormValues = {
  title: "",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  displayDate: "",
  excerpt: "",
  tags: [],
  tagsInput: "",
  image: "/foto-1.jpg",
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function postToFormValues(post: PostEntry): PostFormValues {
  return {
    ...post,
    tagsInput: post.tags.join(", "),
  };
}

export function formValuesToPost(values: PostFormValues, slug: string): PostEntry {
  const tags = values.tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    slug,
    title: values.title.trim(),
    author: values.author.trim(),
    date: values.date,
    displayDate: values.displayDate.trim(),
    excerpt: values.excerpt.trim(),
    tags,
    image: values.image.trim() || "/foto-1.jpg",
  };
}
