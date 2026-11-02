import { Home } from "@/components/home";
import { type Lang } from "@/lib/products";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `/${lang}/`,
      languages: { en: "/en/", pl: "/pl/" },
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  return <Home lang={(await params).lang} />;
}
