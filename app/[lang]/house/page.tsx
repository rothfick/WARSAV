import Link from "next/link";
import { type Lang, products } from "@/lib/products";
import { t } from "@/lib/copy";
import { RevealImage } from "@/components/editorial";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return { title: t(lang).house, alternates: { canonical: `/${lang}/house/` } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const c = t(lang);
  return (
    <main id="main" className="inner-page">
      <header className="page-heading section-pad">
        <p className="meta">THE HOUSE / EST. MMXXVI</p>
        <h1>{c.houseTitle}</h1>
      </header>
      <section className="house-story section-pad">
        <RevealImage
          src={products[5].images.campaign}
          alt="The Business outside a Warsaw cultural institution"
          priority
        />
        <div>
          <p className="meta">WARSAV / WARSAW, POLAND</p>
          <h2>{c.entrance}</h2>
          <p>{c.houseText}</p>
          <p>{c.houseText2}</p>
          <Link className="text-link" href={`/${lang}/collection/`}>
            {c.collection} ↗
          </Link>
        </div>
      </section>
      <blockquote className="house-quote">
        “{c.manifesto}”<cite className="meta">PRIVATE CIRCULATION / 001</cite>
      </blockquote>
    </main>
  );
}
