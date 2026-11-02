export type Lang = "en" | "pl";
export const languages: Lang[] = ["en", "pl"];
export const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Product = {
  id: string;
  slug: string;
  name: string;
  quote: string;
  color: string;
  colorHex: string;
  price: number;
  material: string;
  gsm: number;
  story: Record<Lang, string>;
  division: string;
  location: string;
  sizes: readonly string[];
  stock: Record<string, number>;
  images: {
    campaign: string;
    front: string;
    back: string;
    detail: string;
    label: string;
    board: string;
  };
};
const rows = [
  [
    "001",
    "the-fixer",
    "THE FIXER",
    "Mam człowieka od tego.",
    "Ivory",
    "#E8DFCF",
    "PRIVATE ASSISTANCE",
    "Aleje Ujazdowskie",
    "Some numbers never make it into your contacts.",
    "Niektórych numerów nie zapisujesz w kontaktach.",
  ],
  [
    "002",
    "the-elevator",
    "THE ELEVATOR",
    "Sam do wszystkiego doszedłem. Windą.",
    "Midnight Navy",
    "#111827",
    "46TH FLOOR",
    "Śródmieście",
    "The view is different when someone holds the door.",
    "Widok jest inny, gdy ktoś przytrzyma drzwi.",
  ],
  [
    "003",
    "the-purchase",
    "THE PURCHASE",
    "Nie wiem ile kosztuje. Podobało mi się.",
    "Champagne",
    "#DDD0B8",
    "PRIVATE ACCOUNT",
    "Bracka",
    "A matter of taste. The receipt is elsewhere.",
    "Kwestia gustu. Paragon jest gdzie indziej.",
  ],
  [
    "004",
    "the-expense",
    "THE EXPENSE",
    "Wrzucimy w koszty.",
    "British Racing Green",
    "#102B24",
    "BUSINESS EXPENSE",
    "Warsaw, 22:40",
    "The conversation continues after the bill arrives.",
    "Rozmowa trwa również po przyniesieniu rachunku.",
  ],
  [
    "005",
    "the-owner",
    "THE OWNER",
    "Mam numer do właściciela.",
    "Washed Black",
    "#191817",
    "PRIVATE CONTACTS DIVISION",
    "Private entrance",
    "There was never a reservation in your name.",
    "Nigdy nie było rezerwacji na twoje nazwisko.",
  ],
  [
    "006",
    "the-business",
    "THE BUSINESS",
    "Biznes to też sztuka.",
    "Warm Cream",
    "#DDD0B8",
    "CULTURAL AFFAIRS",
    "Warsaw",
    "An appreciation of the finer transactions.",
    "Uznanie dla szlachetniejszych transakcji.",
  ],
];
export const products: Product[] = rows.map(
  ([id, slug, name, quote, color, colorHex, division, location, en, pl]) => ({
    id,
    slug,
    name,
    quote,
    color,
    colorHex,
    division,
    location,
    price: 490,
    material: "Heavyweight cotton",
    gsm: 280,
    story: { en, pl },
    sizes,
    stock: { XS: 0, S: 5, M: 8, L: 3, XL: 2, XXL: 0 },
    images: {
      campaign: `/warsav/drop-001/campaign/${id}.webp`,
      front: `/warsav/drop-001/products/${id}-front.webp`,
      back: `/warsav/drop-001/products/${id}-back.webp`,
      detail: `/warsav/drop-001/details/${id}-print.webp`,
      label: `/warsav/drop-001/details/${id}-label.webp`,
      board: `/warsav/drop-001/editorial/${id}-board.webp`,
    },
  }),
);
export const money = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
export const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://warsav-private-circulation.robertoo256.chatgpt.site";
