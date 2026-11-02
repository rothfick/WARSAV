import { products, languages, origin } from "@/lib/products";
export const dynamic = "force-static";
export default function sitemap() {
  return languages.flatMap((lang) =>
    [
      "",
      "collection/",
      "circulation/",
      "house/",
      "private-access/",
      ...products.map((p) => `collection/${p.slug}/`),
    ].map((path) => ({
      url: `${origin}/${lang}/${path}`,
      lastModified: new Date("2026-11-02"),
      changeFrequency: "monthly" as const,
      priority: path ? 0.7 : 1,
    })),
  );
}
