"use client";

import { useState } from "react";

export default function GenAiDetailsClient({ id, url, slug }: { id: string; url: string; slug: string }) {
  const [loading, setLoading] = useState(false);

  async function handleOpen(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // fire-and-forget tracking
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'genai_click', id, slug, timestamp: Date.now() })
      });
    } catch (err) {
      // ignore
    }

    // Open in new tab
    window.open(url, '_blank', 'noopener');
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={handleOpen} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow">
        {loading ? 'Opening...' : 'Open App'}
      </button>
      <button
        onClick={async () => {
          // small trace event for copy link
          try {
            await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'genai_copy', id, slug, timestamp: Date.now() }) });
          } catch {}
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard');
        }}
        className="text-sm text-slate-600 underline"
      >
        Copy link
      </button>
    </div>
  );
}
