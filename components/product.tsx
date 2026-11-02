"use client";
import { useState } from "react";
import { type Product, type Lang, money } from "@/lib/products";
import { t } from "@/lib/copy";
import { Modal, useCart } from "./shell";
export function ProductGallery({
  product: p,
  lang,
}: {
  product: Product;
  lang: Lang;
}) {
  const c = t(lang);
  const images = [
    { src: p.images.campaign, label: c.campaign },
    { src: p.images.front, label: c.front },
    { src: p.images.back, label: c.rear },
    { src: p.images.detail, label: c.detail },
    { src: p.images.label, label: c.label },
    { src: p.images.board, label: "Campaign board" },
  ];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [magnified, setMagnified] = useState(false);
  return (
    <div className="gallery">
      <button
        className={`gallery-main ${active === 0 ? "campaign-view" : ""}`}
        onClick={() => {
          setMagnified(false);
          setZoom(true);
        }}
        aria-label={`${lang === "en" ? "Enlarge" : "Powiększ"} ${images[active].label}`}
      >
        <img
          key={active}
          src={images[active].src}
          alt={`${p.name} — ${images[active].label}`}
          fetchPriority="high"
        />
        <span className="gallery-enlarge meta">
          {images[active].label} <span>↗</span>
        </span>
      </button>
      <div className="gallery-thumbnails">
        {images.map((im, i) => (
          <button
            key={im.src}
            aria-label={im.label}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <img src={im.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <p className="gallery-credit meta">
        WARSAV / PRIVATE CIRCULATION / FRAME {p.id}
      </p>
      <Modal
        open={zoom}
        onClose={() => setZoom(false)}
        label={`${p.name} — ${images[active].label}`}
        className="zoom-modal"
      >
        <div className={`zoom-stage ${magnified ? "magnified" : ""}`}>
          <button
            onClick={() => setMagnified(!magnified)}
            aria-label={magnified ? "Zoom out" : "Zoom in"}
          >
            <img
              src={images[active].src}
              alt={`${p.name} — ${images[active].label}`}
            />
          </button>
        </div>
        <div className="zoom-controls meta">
          <button
            onClick={() => {
              setActive((active + images.length - 1) % images.length);
              setMagnified(false);
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <span>
            {images[active].label} / {active + 1} OF {images.length}
          </span>
          <button
            onClick={() => {
              setActive((active + 1) % images.length);
              setMagnified(false);
            }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </Modal>
    </div>
  );
}
export function ProductInfo({
  product: p,
  lang,
}: {
  product: Product;
  lang: Lang;
}) {
  const c = t(lang);
  const [size, setSize] = useState("");
  const [sizeSheet, setSizeSheet] = useState(false);
  const [error, setError] = useState("");
  const cart = useCart();
  const options = (
    <div className="sizes">
      {p.sizes.map((s) => (
        <button
          key={s}
          disabled={!p.stock[s]}
          aria-label={`${s}${!p.stock[s] ? ` — ${c.unavailable}` : ""}`}
          aria-pressed={s === size}
          onClick={() => {
            setSize(s);
            setError("");
            setSizeSheet(false);
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
  return (
    <div className="product-info">
      <p className="meta">{p.id} / 006 — DROP 001</p>
      <h1>
        {p.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
      </h1>
      <p className="editorial-quote">“{p.quote}”</p>
      <div className="price-line">
        <span>{money(p.price)}</span>
        <span className="meta">280 GSM</span>
      </div>
      <p className="color-line meta">
        <i style={{ background: p.colorHex }} />
        {p.color}
      </p>
      <p className="meta">{p.material}</p>
      <div className="size-header meta">
        <span>{c.size}</span>
        <a href="#fit">
          {lang === "en" ? "Fit notes" : "Informacje o kroju"} ↗
        </a>
      </div>
      <div className="desktop-sizes">{options}</div>
      <button className="mobile-size-select" onClick={() => setSizeSheet(true)}>
        {size || c.select} <span>⌄</span>
      </button>
      <p className="stock-note meta" aria-live="polite">
        {size ? (p.stock[size] <= 3 ? c.limited : c.available) : "XS — XXL"}
      </p>
      <button
        className="solid-button"
        onClick={() => {
          if (!size) {
            setError(c.select);
            return;
          }
          if (!cart.add(p.id, size))
            setError(
              lang === "en"
                ? "Preview stock limit reached for this size."
                : "Osiągnięto limit dostępności tego rozmiaru.",
            );
        }}
      >
        {c.add} <span>↗</span>
      </button>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <p className="preview-note">{c.preview}</p>
      <div className="accordions">
        <details open>
          <summary>{c.piece}</summary>
          <p className="meta">{p.division} / WARSAW</p>
          <p>{p.story[lang]}</p>
        </details>
        <details id="fit">
          <summary>{c.fit}</summary>
          <p>
            {lang === "en"
              ? "A relaxed, oversized silhouette, as shown in the campaign. Final measurements and the size chart will be confirmed before orders open."
              : "Swobodna, obszerna sylwetka widoczna w kampanii. Ostateczne wymiary i tabela rozmiarów zostaną potwierdzone przed otwarciem zamówień."}
          </p>
        </details>
        <details>
          <summary>{c.material}</summary>
          <p>
            {lang === "en"
              ? "Heavyweight cotton. 280 GSM. The campaign board is the reference for colour, artwork and label placement. Final composition will be confirmed at release."
              : "Ciężka bawełna. 280 GSM. Plansza kampanii jest wzorem koloru, grafiki i umiejscowienia metki. Ostateczny skład zostanie potwierdzony przy premierze."}
          </p>
        </details>
        <details>
          <summary>{c.delivery}</summary>
          <p>
            {lang === "en"
              ? "Delivery destinations, costs and dispatch dates will be published when the collection opens. This preview does not accept orders."
              : "Kierunki dostawy, koszty i terminy wysyłki zostaną opublikowane wraz z otwarciem kolekcji. Ten podgląd nie przyjmuje zamówień."}
          </p>
        </details>
        <details>
          <summary>{c.care}</summary>
          <p>
            {lang === "en"
              ? "Follow the final garment care label. Detailed washing and print-care instructions will accompany the release."
              : "Należy przestrzegać zaleceń na docelowej metce. Szczegółowe instrukcje prania i pielęgnacji nadruku pojawią się przy premierze."}
          </p>
        </details>
      </div>
      <Modal
        open={sizeSheet}
        onClose={() => setSizeSheet(false)}
        label={c.select}
        className="size-sheet"
      >
        <h2>{c.select}</h2>
        {options}
        <p className="preview-note">{c.preview}</p>
      </Modal>
    </div>
  );
}
