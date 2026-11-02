import { siteUrl } from "@/lib/products";
import { Home } from "@/components/home";
import { Shell } from "@/components/shell";
export const metadata = { alternates: { canonical: siteUrl("/en/") } };
export default function Page() {
  return (
    <Shell lang="en">
      <Home lang="en" />
    </Shell>
  );
}
