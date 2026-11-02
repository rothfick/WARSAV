import { siteUrl } from "@/lib/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Lang } from "@/lib/products";
const pages: Record<string, { en: [string, string]; pl: [string, string] }> = {
  contact: {
    en: [
      "Private office",
      "The WARSAV contact office opens with the collection. No official contact address has been announced. You can prepare a private-list request in this preview.",
    ],
    pl: [
      "Prywatne biuro",
      "Biuro kontaktowe WARSAV zostanie otwarte wraz z kolekcją. Oficjalny adres kontaktowy nie został jeszcze ogłoszony. W podglądzie możesz przygotować prośbę o dostęp do prywatnej listy.",
    ],
  },
  delivery: {
    en: [
      "Delivery",
      "Orders are not open. Delivery destinations, charges, carriers and dispatch estimates will be confirmed before purchases are enabled.",
    ],
    pl: [
      "Dostawa",
      "Zamówienia nie są otwarte. Kierunki dostawy, opłaty, przewoźnicy i terminy wysyłki zostaną potwierdzone przed uruchomieniem sprzedaży.",
    ],
  },
  returns: {
    en: [
      "Returns",
      "The return process and applicable purchase conditions will be published before the collection opens for orders. No purchases can be made in this preview.",
    ],
    pl: [
      "Zwroty",
      "Procedura zwrotów i warunki zakupu zostaną opublikowane przed otwarciem zamówień. W tym podglądzie nie można dokonywać zakupów.",
    ],
  },
  terms: {
    en: [
      "Terms & privacy",
      "This is a preview of a fictional fashion house. Product prices and inventory are illustrative. The bag and private-list request are stored only in your browser. No payment or email is sent. Clear your browser’s site data to remove these records. Final seller information, purchase terms and a privacy policy must be supplied before launch.",
    ],
    pl: [
      "Regulamin i prywatność",
      "To podgląd fikcyjnego domu mody. Ceny i dostępność są przykładowe. Torba i prośba o dostęp do prywatnej listy są przechowywane wyłącznie w przeglądarce. Nie pobieramy płatności ani nie wysyłamy wiadomości e-mail. Usuń dane tej witryny w przeglądarce, aby usunąć te zapisy. Dane sprzedawcy, warunki zakupu i polityka prywatności muszą zostać uzupełnione przed premierą.",
    ],
  },
  instagram: {
    en: [
      "Outside the circulation",
      "An official WARSAV Instagram account has not been announced. The campaign is available in the circulation archive.",
    ],
    pl: [
      "Poza obiegiem",
      "Oficjalne konto WARSAV na Instagramie nie zostało jeszcze ogłoszone. Kampania jest dostępna w archiwum obiegu.",
    ],
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((topic) => ({ topic }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; topic: string }>;
}) {
  const { lang, topic } = await params;
  return {
    title: pages[topic]?.[lang][0],
    alternates: { canonical: siteUrl(`/${lang}/information/${topic}/`) },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; topic: string }>;
}) {
  const { lang, topic } = await params;
  const content = pages[topic]?.[lang];
  if (!content) notFound();
  return (
    <main id="main" className="inner-page information-page section-pad">
      <p className="meta">WARSAV / PRIVATE OFFICE</p>
      <h1>{content[0]}</h1>
      <p>{content[1]}</p>
      <Link
        className="text-link"
        href={`/${lang}/${topic === "instagram" ? "circulation" : "private-access"}/`}
      >
        {topic === "instagram" ? "CIRCULATION" : "PRIVATE ACCESS"} ↗
      </Link>
    </main>
  );
}
