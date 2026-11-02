"use client";
import { useState } from "react";
import { type Lang } from "@/lib/products";
import { t } from "@/lib/copy";
export function PrivateAccessForm({ lang }: { lang: Lang }) {
  const c = t(lang);
  const [received, setReceived] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className="private-access" id="private-access">
      <p className="meta">WARSAV / PRIVATE LIST</p>
      <h2>
        Private
        <br />
        <em>circulation.</em>
      </h2>
      <p className="serif access-copy">{c.list}</p>
      {received ? (
        <div className="access-confirm" role="status">
          <p className="meta">{c.received}</p>
          <p>{c.saved}</p>
          <button className="text-link" onClick={() => setReceived(false)}>
            {lang === "en" ? "Edit request" : "Edytuj prośbę"} ↗
          </button>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            const data = new FormData(e.currentTarget);
            try {
              localStorage.setItem(
                "warsav-private-request",
                JSON.stringify({
                  email: data.get("email"),
                  createdAt: new Date().toISOString(),
                  status: "local-preview",
                }),
              );
              setReceived(true);
            } catch {
              setError(
                lang === "en"
                  ? "Your browser could not save the request. Please enable local storage and try again."
                  : "Przeglądarka nie mogła zapisać prośby. Włącz lokalną pamięć i spróbuj ponownie.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <label htmlFor="private-email" className="meta">
            {c.email}
          </label>
          <div className="email-row">
            <input
              id="private-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@private.address"
              maxLength={254}
            />
            <button type="submit" disabled={busy}>
              {busy ? "…" : c.request} ↗
            </button>
          </div>
          <p className="access-disclaimer">{c.formNote}</p>
          {error && <p role="alert">{error}</p>}
        </form>
      )}
      <p className="meta access-footnote">{c.notGuaranteed}</p>
    </section>
  );
}
