"use client";

import { useEffect, useRef, useState } from "react";

export default function TechnicalManualView() {
  const ref1 = useRef<HTMLObjectElement | null>(null);
  const ref2 = useRef<HTMLObjectElement | null>(null);
  const container1 = useRef<HTMLDivElement | null>(null);
  const container2 = useRef<HTMLDivElement | null>(null);
  const [full1, setFull1] = useState(false);
  const [full2, setFull2] = useState(false);

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

    function onFsChange() {
      const el = document.fullscreenElement;
      setFull1(!!el && container1.current && (el === container1.current || container1.current.contains(el)));
      setFull2(!!el && container2.current && (el === container2.current || container2.current.contains(el)));
    }

    document.addEventListener("keydown", block, true);
    document.addEventListener("contextmenu", prevent, true);
    document.addEventListener("fullscreenchange", onFsChange);

    return () => {
      document.removeEventListener("keydown", block, true);
      document.removeEventListener("contextmenu", prevent, true);
      document.removeEventListener("fullscreenchange", onFsChange);
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

  async function enterFull(container: HTMLDivElement | null) {
    if (!container) return;
    try {
      if ((container as any).requestFullscreen) await (container as any).requestFullscreen();
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div ref={container1} className="relative h-[72vh] overflow-hidden rounded border">
        <div className="absolute right-2 top-2 z-30 flex gap-2">
          <button
            onClick={() => enterFull(container1.current)}
            className="rounded bg-slate-800/80 px-3 py-1 text-sm text-white"
          >
            Full screen
          </button>
        </div>

        <object
          ref={ref1}
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
          onWheel={(e) => forwardWheel(e, ref1.current)}
          style={{ touchAction: "none" }}
          className={`absolute inset-0 z-10 bg-transparent ${full1 ? "pointer-events-none" : ""}`}
        />
      </div>

      <div ref={container2} className="relative h-[72vh] overflow-hidden rounded border">
        <div className="absolute right-2 top-2 z-30 flex gap-2">
          <button
            onClick={() => enterFull(container2.current)}
            className="rounded bg-slate-800/80 px-3 py-1 text-sm text-white"
          >
            Full screen
          </button>
        </div>

        <object
          ref={ref2}
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
          onWheel={(e) => forwardWheel(e, ref2.current)}
          style={{ touchAction: "none" }}
          className={`absolute inset-0 z-10 bg-transparent ${full2 ? "pointer-events-none" : ""}`}
        />
      </div>
    </div>
  );
}
