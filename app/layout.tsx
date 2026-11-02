import type { Metadata } from "next";
import "@fontsource/bodoni-moda/latin-400.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "@fontsource/bodoni-moda/latin-ext-400.css";
import "@fontsource/bodoni-moda/latin-ext-400-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "./globals.css";
import { origin } from "@/lib/products";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "WARSAV — Private Circulation", template: "%s — WARSAV" },
  description:
    "DROP 001. Six pieces. Limited circulation. A fashion house born in Warsaw.",
  openGraph: {
    type: "website",
    siteName: "WARSAV",
    title: "WARSAV — Private Circulation",
    description: "Warsaw has another entrance. DROP 001.",
    images: [
      {
        url: "/warsav/drop-001/editorial/001-board.webp",
        width: 1600,
        height: 1600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WARSAV — Private Circulation",
    images: ["/warsav/drop-001/editorial/001-board.webp"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
