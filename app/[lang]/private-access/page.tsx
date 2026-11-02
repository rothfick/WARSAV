import { PrivateAccessForm } from "@/components/access-form";
import { type Lang } from "@/lib/products";
import { t } from "@/lib/copy";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return {
    title: t(lang).access,
    alternates: { canonical: `/${lang}/private-access/` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return (
    <main id="main" className="inner-page access-page">
      <h1 className="sr-only">{t(lang).access}</h1>
      <PrivateAccessForm lang={lang} />
    </main>
  );
}
