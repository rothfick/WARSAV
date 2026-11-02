import Link from "next/link";
export default function NotFound() {
  return (
    <main className="error-page">
      <p className="wordmark">WARSAV</p>
      <p className="meta">404 / UNLISTED ADDRESS</p>
      <h1>Another entrance.</h1>
      <p>This address is outside the circulation.</p>
      <Link className="text-link" href="/en/">
        Return to the House ↗
      </Link>
    </main>
  );
}
