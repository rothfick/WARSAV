import Link from "next/link";
import { products, type Product, type Lang, money } from "@/lib/products";
import { t } from "@/lib/copy";
export function SectionMeta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`meta ${className}`}>{children}</p>;
}
export function EditorialHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`editorial-heading ${className}`}>{children}</h2>;
}
export function EditorialQuote({ children }: { children: React.ReactNode }) {
  return <p className="editorial-quote">“{children}”</p>;
}
export function ArchiveLabel({
  number,
  location,
}: {
  number: string;
  location: string;
}) {
  return (
    <div className="archive-label">
      <span>FRAME {number}</span>
      <span>{location} / MMXXVI</span>
      <span>PRIVATE CIRCULATION</span>
    </div>
  );
}
export function RevealImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const campaign = src.includes("/campaign/");
  return (
    <div className={`image-wrap ${className}`}>
      <img
        src={src}
        srcSet={
          campaign
            ? `${src.replace(".webp", "-sm.webp")} 600w, ${src} 1200w`
            : undefined
        }
        sizes={campaign ? "(max-width: 700px) 100vw, 70vw" : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </div>
  );
}
export function ProductChapter({
  product: p,
  lang,
  index,
}: {
  product: Product;
  lang: Lang;
  index: number;
}) {
  const c = t(lang);
  return (
    <article className={`chapter chapter-${index + 1}`}>
      <Link
        className="chapter-image"
        href={`/${lang}/collection/${p.slug}/`}
        aria-label={`${c.view}: ${p.name}`}
      >
        <RevealImage
          src={p.images.campaign}
          alt={`${p.name} — ${p.location}, WARSAV campaign`}
        />
        <span className="image-view">{c.view} ↗</span>
      </Link>
      <div className="chapter-copy">
        <SectionMeta>
          <span title="CIRCULATION: PRIVATE">{p.id} / 006</span> — {p.division}
        </SectionMeta>
        <span className="chapter-number" aria-hidden="true">
          {p.id}
        </span>
        <h3>
          {p.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
        </h3>
        <EditorialQuote>{p.quote}</EditorialQuote>
        <p className="story">{p.story[lang]}</p>
        <Link className="text-link" href={`/${lang}/collection/${p.slug}/`}>
          {c.view} <span>↗</span>
        </Link>
      </div>
    </article>
  );
}
export function ProductIndex({
  lang,
  heading = true,
}: {
  lang: Lang;
  heading?: boolean;
}) {
  const c = t(lang);
  return (
    <section className="collection-index section-pad" id="collection-index">
      {heading && (
        <div className="section-top">
          <div>
            <SectionMeta>DROP 001 / PRIVATE CIRCULATION</SectionMeta>
            <EditorialHeading>{c.index}</EditorialHeading>
          </div>
          <p className="serif small">{c.six}</p>
        </div>
      )}
      <div className="product-grid">
        {products.map((p) => (
          <Link
            key={p.id}
            className="product-card"
            href={`/${lang}/collection/${p.slug}/`}
          >
            <div className="product-thumb">
              <img
                src={p.images.front}
                alt={`${p.name}, ${p.color}, front`}
                loading="lazy"
              />
              <img
                className="swap"
                src={p.images.back}
                alt={`${p.name}, back artwork`}
                loading="lazy"
              />
              <span className="product-view">VIEW {p.id} ↗</span>
            </div>
            <div className="product-line">
              <span>
                {p.id} / {p.name}
              </span>
              <span>{money(p.price)}</span>
            </div>
            <p className="meta muted">280 GSM / {p.color}</p>
          </Link>
        ))}
      </div>
      <p className="preview-note">{c.preview}</p>
    </section>
  );
}
export function WarsawInterlude({ lang }: { lang: Lang }) {
  return (
    <section className="warsaw-interlude">
      <RevealImage
        src={products[4].images.campaign}
        alt="An unlisted entrance, Warsaw after dark"
      />
      <div className="interlude-copy">
        <SectionMeta>WARSAV / UNOFFICIAL INFRASTRUCTURE</SectionMeta>
        <h2>
          {lang === "en" ? (
            <>
              Warsaw has
              <br />
              <em>another</em>
              <br />
              entrance.
            </>
          ) : (
            <>
              Warszawa ma
              <br />
              <em>inne</em>
              <br />
              wejście.
            </>
          )}
        </h2>
        <Link className="text-link" href={`/${lang}/house/`}>
          {t(lang).read} ↗
        </Link>
      </div>
      <ArchiveLabel number="005" location="WARSAW / 52°13′N" />
    </section>
  );
}
