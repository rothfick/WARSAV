"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, money, type Lang } from "@/lib/products";
import { t } from "@/lib/copy";
type Line = { id: string; size: string; quantity: number };
type Store = {
  lines: Line[];
  add: (id: string, size: string) => boolean;
  openBag: () => void;
};
const CartContext = createContext<Store>({
  lines: [],
  add: () => false,
  openBag: () => {},
});
export const useCart = () => useContext(CartContext);
export function Modal({
  open,
  onClose,
  label,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const previous = document.activeElement as HTMLElement;
    if (open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (d.open) d.close();
    return () => {
      if (d.open) d.close();
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="close-button meta"
        onClick={onClose}
        aria-label={label === "Menu" ? "Close menu" : "Close dialog"}
      >
        × <span>{label === "Menu" ? "Close" : "Close / Zamknij"}</span>
      </button>
      {children}
    </dialog>
  );
}
export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const c = t(lang);
  const path = usePathname();
  const languagePath = path === "/" ? "/en/" : path;
  const [menu, setMenu] = useState(false);
  const [bag, setBag] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [intro, setIntro] = useState(false);
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("warsav-bag") || "[]");
      if (Array.isArray(data))
        setLines(
          data
            .filter(
              (x: Line) =>
                products.some(
                  (p) => p.id === x.id && p.sizes.includes(x.size),
                ) &&
                Number.isInteger(x.quantity) &&
                x.quantity > 0,
            )
            .map((x: Line) => ({
              ...x,
              quantity: Math.min(
                x.quantity,
                products.find((p) => p.id === x.id)!.stock[x.size],
              ),
            }))
            .filter((x: Line) => x.quantity > 0),
        );
      if (!sessionStorage.getItem("warsav-entered")) {
        setIntro(true);
        sessionStorage.setItem("warsav-entered", "1");
      }
    } catch {}
    setReady(true);
    const timer = setTimeout(() => setIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("warsav-bag", JSON.stringify(lines));
      } catch {}
  }, [lines, ready]);
  useEffect(() => {
    document.documentElement.lang = lang;
    setMenu(false);
    setBag(false);
    setCheckout(false);
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [path, lang]);
  const add = (id: string, size: string) => {
    const max = products.find((p) => p.id === id)?.stock[size] || 0;
    const current =
      lines.find((x) => x.id === id && x.size === size)?.quantity || 0;
    if (current >= max) return false;
    setLines((old) => {
      const found = old.find((x) => x.id === id && x.size === size);
      return found
        ? old.map((x) => (x === found ? { ...x, quantity: x.quantity + 1 } : x))
        : [...old, { id, size, quantity: 1 }];
    });
    setCheckout(false);
    setBag(true);
    return true;
  };
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const total = lines.reduce(
    (n, l) => n + products.find((p) => p.id === l.id)!.price * l.quantity,
    0,
  );
  const home = path === "/" || path === `/${lang}/` || path === `/${lang}`;
  const links = [
    ["collection", c.collection],
    ["circulation", c.circulation],
    ["house", c.house],
    ["private-access", c.access],
  ];
  return (
    <CartContext.Provider value={{ lines, add, openBag: () => setBag(true) }}>
      <a className="skip-link" href="#main">
        {lang === "en" ? "Skip to content" : "Przejdź do treści"}
      </a>
      {intro && (
        <div className="entrance" aria-hidden="true">
          <span className="wordmark">WARSAV</span>
          <p className="meta">PRIVATE CIRCULATION</p>
          <i />
          <p className="meta">DROP 001</p>
        </div>
      )}
      <header className={`header ${home && !scrolled ? "over-hero" : ""}`}>
        <Link className="header-collection meta" href={`/${lang}/collection/`}>
          {c.collection}
        </Link>
        <Link className="wordmark" href={`/${lang}/`} aria-label="WARSAV home">
          WARSAV
        </Link>
        <div className="header-right">
          <button
            className="meta"
            onClick={() => setMenu(true)}
            aria-haspopup="dialog"
          >
            {c.menu} <span className="menu-lines">═</span>
          </button>
          <button
            className="meta"
            onClick={() => {
              setCheckout(false);
              setBag(true);
            }}
            aria-haspopup="dialog"
          >
            {c.bag} ({count})
          </button>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="footer-top">
          <p className="meta">
            PRIVATE CIRCULATION
            <br />
            WARSAW, POLAND
          </p>
          <div className="footer-links">
            {links.map(([url, label]) => (
              <Link key={url} href={`/${lang}/${url}/`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="footer-links">
            {["contact", "delivery", "returns", "terms", "instagram"].map(
              (topic) => (
                <Link key={topic} href={`/${lang}/information/${topic}/`}>
                  {
                    {
                      contact: lang === "pl" ? "Kontakt" : "Contact",
                      delivery: c.delivery,
                      returns: lang === "pl" ? "Zwroty" : "Returns",
                      terms: lang === "pl" ? "Regulamin" : "Terms",
                      instagram: "Instagram",
                    }[topic]
                  }
                </Link>
              ),
            )}
          </div>
        </div>
        <Link className="footer-wordmark" href={`/${lang}/`}>
          WARSAV
        </Link>
        <div className="footer-bottom meta">
          <button
            onClick={() => {
              setDenied(true);
              setTimeout(() => setDenied(false), 1800);
            }}
            aria-label="WARSAV copyright"
          >
            {denied ? "ACCESS DENIED" : "© WARSAV MMXXVI"}
          </button>
          <span>PRIVATE CIRCULATION ONLY</span>
          <div>
            <Link
              href={languagePath.replace(/^\/(en|pl)/, "/en")}
              aria-current={lang === "en" ? "true" : undefined}
            >
              EN
            </Link>
            <span> / </span>
            <Link
              href={languagePath.replace(/^\/(en|pl)/, "/pl")}
              aria-current={lang === "pl" ? "true" : undefined}
            >
              PL
            </Link>
          </div>
        </div>
      </footer>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        label="Menu"
        className="full-menu"
      >
        <p className="wordmark">WARSAV</p>
        <nav>
          {links.map(([url, label], i) => (
            <Link
              key={url}
              href={`/${lang}/${url}/`}
              onClick={() => setMenu(false)}
            >
              <span className="meta">0{i + 1}</span>
              {label}
              <span className="nav-arrow">↗</span>
            </Link>
          ))}
        </nav>
        <img
          loading="lazy"
          className="menu-image"
          src={products[2].images.campaign}
          alt="WARSAV on Bracka"
        />
        <div className="menu-footer meta">
          <span>WARSAW / POLAND</span>
          <span>
            <Link href={languagePath.replace(/^\/(en|pl)/, "/en")}>EN</Link> /{" "}
            <Link href={languagePath.replace(/^\/(en|pl)/, "/pl")}>PL</Link>
          </span>
          <Link href={`/${lang}/information/contact/`}>{c.access} ↗</Link>
        </div>
      </Modal>
      <Modal
        open={bag}
        onClose={() => setBag(false)}
        label={c.bag}
        className="cart-drawer"
      >
        <SectionHeader title={c.bag} count={count} />
        {lines.length === 0 ? (
          <div className="empty-cart">
            <p className="serif">{c.empty}</p>
            <Link
              className="text-link"
              onClick={() => setBag(false)}
              href={`/${lang}/collection/`}
            >
              {c.continue} ↗
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((l) => {
                const p = products.find((p) => p.id === l.id)!;
                return (
                  <div className="cart-line" key={l.id + l.size}>
                    <Link
                      href={`/${lang}/collection/${p.slug}/`}
                      onClick={() => setBag(false)}
                    >
                      <img src={p.images.front} alt={p.name} />
                    </Link>
                    <div>
                      <p className="meta">
                        {p.id} / {p.name}
                      </p>
                      <p className="meta muted">
                        {p.color} / {l.size}
                      </p>
                      <div className="quantity">
                        <button
                          aria-label={`Decrease ${p.name}`}
                          disabled={l.quantity <= 1}
                          onClick={() =>
                            setLines((old) =>
                              old.map((x) =>
                                x === l
                                  ? { ...x, quantity: x.quantity - 1 }
                                  : x,
                              ),
                            )
                          }
                        >
                          −
                        </button>
                        <span aria-label={c.quantity}>{l.quantity}</span>
                        <button
                          aria-label={`Increase ${p.name}`}
                          disabled={l.quantity >= p.stock[l.size]}
                          onClick={() =>
                            setLines((old) =>
                              old.map((x) =>
                                x === l
                                  ? { ...x, quantity: x.quantity + 1 }
                                  : x,
                              ),
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="remove"
                          onClick={() =>
                            setLines((old) => old.filter((x) => x !== l))
                          }
                        >
                          {c.remove}
                        </button>
                      </div>
                      <p className="meta">{money(p.price * l.quantity)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {new Set(lines.map((l) => l.id)).size === 6 && (
              <p className="meta">FULL CIRCULATION</p>
            )}
            <div className="cart-total">
              <span>{c.subtotal}</span>
              <span>{money(total)}</span>
            </div>
            <p className="preview-note">{c.preview}</p>
            <button className="solid-button" onClick={() => setCheckout(true)}>
              {c.checkout} ↗
            </button>
            {checkout && (
              <div role="status" className="checkout-message">
                <h3>
                  {lang === "en"
                    ? "Orders are not open."
                    : "Zamówienia nie są otwarte."}
                </h3>
                <p>
                  {lang === "en"
                    ? "Your selection is saved in this browser. No payment has been taken."
                    : "Twój wybór został zapisany w przeglądarce. Nie pobrano płatności."}
                </p>
                <Link
                  href={`/${lang}/private-access/`}
                  onClick={() => setBag(false)}
                >
                  {c.access} ↗
                </Link>
              </div>
            )}
          </>
        )}
      </Modal>
    </CartContext.Provider>
  );
}
function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="drawer-title">
      <p className="meta">
        PRIVATE CIRCULATION / {String(count).padStart(3, "0")}
      </p>
      <h2>{title}</h2>
    </div>
  );
}
