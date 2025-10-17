// src/constants/categories.ts
export const CATEGORIES = [
  { slug: "friendship", label: "우정" },
  { slug: "love", label: "연애" },
  { slug: "food", label: "음식" },
  { slug: "life", label: "생활" },
  { slug: "work", label: "직장" },
  { slug: "hobby", label: "취미" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
export type CategoryLabel = (typeof CATEGORIES)[number]["label"];

export const SLUG_TO_LABEL: Record<CategorySlug, CategoryLabel> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label]),
) as any;

export const LABEL_TO_SLUG: Record<CategorySlug, CategoryLabel> = Object.fromEntries(
  CATEGORIES.map((c) => [c.label, c.slug]),
) as any;
