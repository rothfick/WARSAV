# WARSAV — Private Circulation

A bilingual editorial fashion-house frontend for DROP 001. Built with Next.js 16 App Router, React and TypeScript. All six supplied campaign boards remain the source of truth; no garment graphics were generated or redrawn.

## Run

```sh
npm ci
npm run dev -- --port 4317
npm run typecheck
npm run build
```

The production build is a static export in `out/`. Serve that directory with a static server supporting directory `index.html` files. `next start` is not used for static exports. The root is an English entry point; `/en/` and `/pl/` are the canonical language routes.

## Design system

`app/globals.css` centralizes the palette, spacing, container, typography, tracking, borders, easing and durations in CSS custom properties. Paper ivory and warm cream give way to oxblood and washed black. Bodoni Moda and Inter are self-hosted through Fontsource, with Latin Extended coverage and their package licenses. The layout uses a 12-column chapter grid, a restrained product index, asymmetric photography and generous pauses. At 700px the compositions change to mobile layouts with full-width galleries and a size-selection bottom sheet.

Motion is deliberately CSS-based: a 1.5-second first-visit entrance, a slow hero image settle, image hover, an oxblood menu wipe, gallery transitions and progressive scroll-linked interlude text where supported. Native scrolling is preserved. Reduced-motion preference disables all decorative animation. Native modal dialogs provide focus containment, Escape dismissal, inert backgrounds and focus restoration. No GSAP or Lenis payload is needed for these effects.

## Structure

- `app/[lang]/`: bilingual homepage, collection, six statically generated product routes, circulation, house, access and information pages.
- `components/home.tsx`: homepage pacing and composition.
- `components/editorial.tsx`: EditorialHeading, SectionMeta, EditorialQuote, ArchiveLabel, RevealImage, ProductChapter, ProductIndex and WarsawInterlude.
- `components/product.tsx`: gallery, enlargement, product details and desktop/mobile size selection.
- `components/shell.tsx`: header, full-screen menu, persistent cart drawer, dialog primitive and footer.
- `components/access-form.tsx`: explicitly local-only private-list preview.
- `lib/products.ts`: six product records, sizes, illustrative stock and price, stories, colours and asset references.
- `lib/copy.ts`: English and Polish interface copy. Garment slogans remain Polish.
- `source-assets/`: original supplied boards, unchanged.
- `scripts/prepare-assets.mjs`: reproducible crop and WebP pipeline.
- `public/warsav/drop-001/`: campaign, products, details and original-board editorial exports.

## Asset replacement

The source boards are 1254 × 1254 pixels. Campaign crops are therefore under 1000 pixels wide and garment/detail crops are smaller; the gallery exposes the available source detail, not invented high resolution. Replace the same named WebP files with standalone production photographs for final launch. Each product references `campaign`, `front`, `back`, `detail`, `label` and `board`; no layout change is required. Campaign images have 600px responsive companions named `001-sm.webp` etc. After modifying crop bounds, run `node scripts/prepare-assets.mjs`. Preserve aspect ratios and never stretch artwork. Original complete boards can be opened in each product gallery.

## Content and availability

Edit product records in `lib/products.ts` and localized copy in `lib/copy.ts`. All prices are illustrative 490 PLN. Stock values are preview fixtures, not real inventory; XS and XXL demonstrate unavailable sizes and XL demonstrates low-stock behavior. No source supplied final pricing, measurements, care rules, commercial contacts or policies, so those are not presented as established facts. Information pages state what must be supplied at launch.

## Commerce integration

The bag persists `{ id, size, quantity }` in localStorage under `warsav-bag`; quantities respect the preview stock limit. Replace this boundary with commerce variant IDs and an adapter for Shopify Storefront, Medusa or your chosen backend. The checkout action currently explains that orders are not open and takes no payment. For launch, create checkout server-side or through a supported Storefront API and redirect only to the returned checkout URL. Revalidate inventory and price on the server; browser data is never authoritative. Keep secrets out of public environment variables.

The private list stores a request only on the current device under `warsav-private-request`. It does not send mail or register anyone externally. Replace the submission handler with a real server endpoint and provider integration, including success/error responses and appropriate consent/privacy copy. Do not show a registration confirmation until the provider confirms it.

## Metadata and release

Canonical URLs use `NEXT_PUBLIC_SITE_URL` or the configured private-preview origin. Metadata, OpenGraph, Twitter, sitemap, robots, Organization, WebSite, Product, Offer and BreadcrumbList data are included. Offers correctly remain `OutOfStock` while real orders are closed. Set the final origin at build time and update availability after commerce is connected. Private hosting access is controlled by Sites, not robots.txt.

The source and private deployment are managed with `.openai/hosting.json`; keep its opaque project ID when updating. This is a complete frontend preview, not an operational store. Before accepting orders, provide real stock/prices, seller and policy details, final photographs, sizing/care information, contact channels, payment/fulfilment integration and a real private-list endpoint.

## Verification

Production static generation and strict TypeScript checks are run. Browser QA covers desktop and 390px mobile, product selection, size availability, bag addition/quantity/subtotal, checkout preview messaging, Escape dismissal and the mobile size sheet. The export check validates local links and image paths across generated HTML. Core Web Vitals require measurements on the final deployed site and are not claimed as measured here.

## GitHub Pages

The public GitHub Pages site is https://rothfick.github.io/WARSAV/ . It is currently published from the verified static export on the `gh-pages` branch (repository Pages source: **Deploy from a branch**, `gh-pages`, `/`). This fallback is active because GitHub blocked the custom Actions job due to an account billing issue.

`.github/workflows/pages.yml` is ready to build and deploy `main` automatically. After the account billing issue is resolved, switch the Pages source to **GitHub Actions** and run the workflow. Until then, rebuild with the environment below and publish the contents of `out/`, including `.nojekyll`, to `gh-pages`.

The workflow sets `NEXT_PUBLIC_BASE_PATH=/WARSAV` and `NEXT_PUBLIC_SITE_URL=https://rothfick.github.io`. Next.js prefixes navigation and bundled assets; product images, metadata, structured data and the sitemap use the same deployment prefix. The default build keeps the existing root-hosted Sites preview configuration. To reproduce the Pages export locally:

```sh
NEXT_PUBLIC_BASE_PATH=/WARSAV NEXT_PUBLIC_SITE_URL=https://rothfick.github.io npm run build
NEXT_PUBLIC_BASE_PATH=/WARSAV python3 scripts/check-export.py
```

Publish `out/` as the Pages artifact. Do not commit `out/` or `node_modules/` to `main`. The workflow uses only the repository's built-in `GITHUB_TOKEN`; no deployment secret is required.
