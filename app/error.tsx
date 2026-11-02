"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="error-page">
      <p className="wordmark">WARSAV</p>
      <p className="meta">TEMPORARILY OUT OF CIRCULATION</p>
      <h1>A brief interruption.</h1>
      <button className="text-link" onClick={reset}>
        Try again ↗
      </button>
    </main>
  );
}
