import { siteUrl } from "@/lib/products";
import Link from "next/link";
import { products, type Lang } from "@/lib/products";
import { t } from "@/lib/copy";
import { RevealImage, ArchiveLabel } from "@/components/editorial";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return {
    title: t(lang).circulation,
    alternates: { canonical: siteUrl(`/${lang}/circulation/`) },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return (
    <main id="main" className="inner-page circulation-page">
      <header className="page-heading section-pad">
        <p className="meta">WARSAW / 52°13′N / MMXXVI</p>
        <h1>The circulation.</h1>
        <p className="serif">{t(lang).edit}</p>
      </header>
      <div className="lookbook-layout">
        <aside>
          <span className="meta">
            PRIVATE CIRCULATION
            <br />
            ISSUE 001
          </span>
          <p className="serif">{t(lang).entrance}</p>
          <span className="meta">
            SIX OBSERVATIONS.
            <br />
            ONE CITY.
          </span>
        </aside>
        <div>
          {products.map((p) => (
            <figure className="lookbook-frame" key={p.id}>
              <Link href={`/${lang}/collection/${p.slug}/`}>
                <RevealImage
                  src={p.images.campaign}
                  alt={`${p.name} — ${p.location}`}
                />
              </Link>
              <figcaption>
                <ArchiveLabel number={p.id} location={p.location} />
                <p className="editorial-quote">“{p.quote}”</p>
                <Link
                  className="text-link"
                  href={`/${lang}/collection/${p.slug}/`}
                >
                  {p.name} ↗
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
