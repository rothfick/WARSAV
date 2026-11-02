import { siteUrl } from "@/lib/products";
import { ProductIndex } from "@/components/editorial";
import { type Lang } from "@/lib/products";
import { t } from "@/lib/copy";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return {
    title: t(lang).collection,
    alternates: {
      canonical: siteUrl(`/${lang}/collection/`),
      languages: {
        en: siteUrl("/en/collection/"),
        pl: siteUrl("/pl/collection/"),
      },
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return (
    <main id="main" className="inner-page">
      <header className="page-heading section-pad">
        <p className="meta">ISSUE 001 / MMXXVI</p>
        <h1>Private circulation.</h1>
        <div className="page-heading-bottom">
          <p className="serif">{t(lang).six}</p>
          <span className="meta">DROP 001 — 280 GSM</span>
        </div>
      </header>
      <ProductIndex lang={lang} heading={false} />
    </main>
  );
}
