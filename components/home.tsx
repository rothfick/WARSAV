import Link from "next/link";
import { products, type Lang, origin } from "@/lib/products";
import { t } from "@/lib/copy";
import {
  RevealImage,
  SectionMeta,
  EditorialHeading,
  ProductChapter,
  ProductIndex,
  WarsawInterlude,
  ArchiveLabel,
} from "./editorial";
import { PrivateAccessForm } from "./access-form";
export function Home({ lang }: { lang: Lang }) {
  const c = t(lang);
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Organization", name: "WARSAV", url: origin },
              {
                "@type": "WebSite",
                name: "WARSAV — Private Circulation",
                url: origin,
                inLanguage: ["en", "pl"],
              },
            ],
          }),
        }}
      />
      <section className="hero">
        <div className="hero-images">
          <RevealImage
            src={products[0].images.campaign}
            alt="The Fixer, ivory cotton, outside a private Warsaw entrance with a chauffeur"
            priority
          />
          <RevealImage
            src={products[1].images.campaign}
            alt="The Elevator, midnight navy, above Warsaw after dark"
          />
        </div>
        <div className="hero-topline meta">
          <span>PRIVATE CIRCULATION</span>
          <span>WARSAW / MMXXVI</span>
        </div>
        <div className="hero-title">
          <p className="meta">THE FIRST ISSUE — DROP 001</p>
          <h1>
            Private
            <br />
            <em>circulation.</em>
          </h1>
        </div>
        <div className="hero-bottom">
          <span className="meta">
            SIX PIECES.
            <br />
            AN UNOFFICIAL PORTRAIT.
          </span>
          <Link href={`/${lang}/collection/`} className="hero-cta meta">
            {c.enter}
            <span>↗</span>
          </Link>
          <span className="hero-page meta">001 — 006</span>
        </div>
      </section>
      <section className="manifesto section-pad">
        <SectionMeta>WARSAV / PRIVATE CIRCULATION / 001</SectionMeta>
        <EditorialHeading>{c.manifesto}</EditorialHeading>
        <div className="manifesto-bottom">
          <p className="serif">“{c.entrance}”</p>
          <div>
            <p>{c.intro}</p>
            <Link className="text-link" href={`/${lang}/house/`}>
              {c.discover} ↗
            </Link>
          </div>
        </div>
      </section>
      <div className="chapters section-pad">
        <div className="section-rule meta">
          <span>DROP 001</span>
          <span>{c.six}</span>
          <span>MMXXVI</span>
        </div>
        {products.slice(0, 3).map((p, i) => (
          <ProductChapter key={p.id} product={p} lang={lang} index={i} />
        ))}
      </div>
      <WarsawInterlude lang={lang} />
      <div className="chapters section-pad">
        {products.slice(3).map((p, i) => (
          <ProductChapter key={p.id} product={p} lang={lang} index={i + 3} />
        ))}
      </div>
      <ProductIndex lang={lang} />
      <section className="home-circulation">
        <div className="circulation-title">
          <SectionMeta>THE CIRCULATION / FRAME 004</SectionMeta>
          <EditorialHeading>
            {lang === "en" ? (
              <>
                After hours.
                <br />
                <em>Before anyone asks.</em>
              </>
            ) : (
              <>
                Po godzinach.
                <br />
                <em>Zanim ktoś zapyta.</em>
              </>
            )}
          </EditorialHeading>
          <Link href={`/${lang}/circulation/`} className="text-link">
            {c.circulation} ↗
          </Link>
        </div>
        <RevealImage
          src={products[3].images.campaign}
          alt="The Expense, a late dinner in Warsaw"
        />
        <ArchiveLabel number="004" location="WARSAW / 22:40" />
      </section>
      <PrivateAccessForm lang={lang} />
    </main>
  );
}
