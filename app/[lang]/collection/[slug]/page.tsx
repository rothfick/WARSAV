import { siteUrl } from "@/lib/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, type Lang, origin } from "@/lib/products";
import { t } from "@/lib/copy";
import { ProductGallery, ProductInfo } from "@/components/product";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.quote} ${p.material}, ${p.gsm} GSM. ${p.color}. DROP 001.`,
    alternates: {
      canonical: siteUrl(`/${lang}/collection/${slug}/`),
      languages: {
        en: siteUrl(`/en/collection/${slug}/`),
        pl: siteUrl(`/pl/collection/${slug}/`),
      },
    },
    openGraph: {
      title: `${p.name} — WARSAV`,
      images: [new URL(p.images.campaign, origin).href],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = products[(products.indexOf(p) + 1) % products.length];
  const url = `${origin}/${lang}/collection/${slug}/`;
  return (
    <main id="main" className="inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                name: p.name,
                sku: p.id,
                description: p.story[lang],
                image: [
                  new URL(p.images.campaign, origin).href,
                  new URL(p.images.front, origin).href,
                ],
                brand: { "@type": "Brand", name: "WARSAV" },
                color: p.color,
                material: p.material,
                offers: {
                  "@type": "Offer",
                  url,
                  priceCurrency: "PLN",
                  price: p.price,
                  availability: "https://schema.org/OutOfStock",
                  description: "Collection preview; orders are not open.",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "WARSAV",
                    item: `${origin}/${lang}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: t(lang).collection,
                    item: `${origin}/${lang}/collection/`,
                  },
                  { "@type": "ListItem", position: 3, name: p.name, item: url },
                ],
              },
            ],
          }),
        }}
      />
      <div className="pdp-breadcrumb meta">
        <Link href={`/${lang}/collection/`}>← {t(lang).back}</Link>
        <span>{p.id} / 006</span>
      </div>
      <div className="pdp">
        <ProductGallery product={p} lang={lang} />
        <ProductInfo product={p} lang={lang} />
      </div>
      <Link className="next-product" href={`/${lang}/collection/${next.slug}/`}>
        <span className="meta">
          {t(lang).next} / {next.id}
        </span>
        <span>
          {next.name
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
          ↗
        </span>
        <img src={next.images.front} alt={next.name} loading="lazy" />
      </Link>
    </main>
  );
}
