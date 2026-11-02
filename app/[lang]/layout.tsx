import { notFound } from "next/navigation";
import { Shell } from "@/components/shell";
import { languages, type Lang } from "@/lib/products";
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!languages.includes(lang as Lang)) notFound();
  return <Shell lang={lang as Lang}>{children}</Shell>;
}
