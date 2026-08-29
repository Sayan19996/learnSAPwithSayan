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

  function forwardWheel(e: React.WheelEvent, iframe: HTMLIFrameElement | null) {
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.scrollBy(0, e.deltaY);
    } catch (err) {
      // ignore
    }
  }

  return (
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
  );
}
