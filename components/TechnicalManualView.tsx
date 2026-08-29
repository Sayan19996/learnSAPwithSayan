"use client";

import { useEffect, useRef } from "react";

export default function TechnicalManualView() {
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

  function forwardWheel(e: React.WheelEvent, el: HTMLObjectElement | null) {
    if (!el) return;
    try {
      const win = (el as any).contentWindow;
      if (win && typeof win.scrollBy === "function") win.scrollBy(0, e.deltaY);
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative h-[72vh] overflow-hidden rounded border">
        <object
          ref={ref1 as any}
          data="/manual-1.pdf#toolbar=0&navpanes=0&view=FitH"
          type="application/pdf"
          className="h-full w-full"
          aria-label="Manual 1 viewer"
        >
          <p className="p-4">PDF viewer not supported. <a href="/manual-1.pdf">Open manual-1.pdf</a></p>
        </object>

        <div
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onDoubleClick={(e) => e.preventDefault()}
          onWheel={(e) => forwardWheel(e, ref1.current as any)}
          style={{ touchAction: "none" }}
          className="absolute inset-0 z-10 bg-transparent"
        />
      </div>

      <div className="relative h-[72vh] overflow-hidden rounded border">
        <object
          ref={ref2 as any}
          data="/manual-2.pdf#toolbar=0&navpanes=0&view=FitH"
          type="application/pdf"
          className="h-full w-full"
          aria-label="Manual 2 viewer"
        >
          <p className="p-4">PDF viewer not supported. <a href="/manual-2.pdf">Open manual-2.pdf</a></p>
        </object>

        <div
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onDoubleClick={(e) => e.preventDefault()}
          onWheel={(e) => forwardWheel(e, ref2.current as any)}
          style={{ touchAction: "none" }}
          className="absolute inset-0 z-10 bg-transparent"
        />
      </div>
    </div>
  );
}
