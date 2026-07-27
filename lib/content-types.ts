export type NovelEntry = {
  slug: string;
  title: string;
  coverImage: string;
  description: string;
  pdfUrl: string | null;
  active: boolean;
};

export type EventEntry = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  schedule: string;
  ctaLabel: string;
  ctaHref: string;
  category: string;
  featured: boolean;
};

export type AboutContent = {
  highlights: {
    title: string;
    description: string;
    href: string;
    cta: string;
  }[];
  paragraphs: string[];
  team: {
    name: string;
    image: string;
    alt: string;
    bio: string;
  }[];
};
