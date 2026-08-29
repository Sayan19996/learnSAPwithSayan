"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export const metadata = {
  title: "Technical Solution Manual — learnSAPwithSayan",
  description: "View-only technical manuals",
};

export default function TechnicalManualPage() {
  const ref1 = useRef<HTMLIFrameElement | null>(null);
  const ref2 = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const block = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p" || e.key === "u")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const prevent = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", block, true);
    document.addEventListener("contextmenu", prevent, true);

    return () => {
      document.removeEventListener("keydown", block, true);
      document.removeEventListener("contextmenu", prevent, true);
    };
  }, []);

  function forwardWheel(e: React.WheelEvent, iframe: HTMLIFrameElement | null) {
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.scrollBy(0, e.deltaY);
    } catch (err) {
      // ignore
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Technical Solution Manual</h1>
        <Link href="/" className="text-sm text-slate-600">Home</Link>
      </div>

      <p className="mb-6 text-slate-600">Two view-only manuals are displayed below. Downloading is disabled in-browser; screenshots may still be possible.</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative h-[72vh] overflow-hidden rounded border">
          <iframe
            ref={ref1}
            src="/manual-1.pdf#toolbar=0&navpanes=0&view=FitH"
            title="Manual 1"
            className="h-full w-full"
            sandbox="allow-same-origin allow-scripts"
          />

          <div
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onDoubleClick={(e) => e.preventDefault()}
            onWheel={(e) => forwardWheel(e, ref1.current)}
            style={{ touchAction: "none" }}
            className="absolute inset-0 z-10 bg-transparent"
          />
        </div>

        <div className="relative h-[72vh] overflow-hidden rounded border">
          <iframe
            ref={ref2}
            src="/manual-2.pdf#toolbar=0&navpanes=0&view=FitH"
            title="Manual 2"
            className="h-full w-full"
            sandbox="allow-same-origin allow-scripts"
          />

          <div
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onDoubleClick={(e) => e.preventDefault()}
            onWheel={(e) => forwardWheel(e, ref2.current)}
            style={{ touchAction: "none" }}
            className="absolute inset-0 z-10 bg-transparent"
          />
        </div>
      </div>
    </main>
  );
}
