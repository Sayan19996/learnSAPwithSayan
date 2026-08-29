"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TechnicalManualModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const block = (e: KeyboardEvent) => {
      // block save/print shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
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
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/60 p-6">
      <div className="relative mx-auto max-w-5xl rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-lg font-semibold">Technical Solution Manual</h3>
          <button onClick={onClose} aria-label="Close" className="rounded px-2 py-1 text-sm">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div className="h-[640px] overflow-hidden rounded border">
            <div className="h-full w-full select-none" style={{ userSelect: "none" }}>
              <iframe
                src="/manual-1.pdf"
                title="Manual 1"
                className="h-full w-full"
                sandbox="allow-same-origin allow-scripts"
                aria-label="Manual 1 viewer"
              />
            </div>
          </div>

          <div className="h-[640px] overflow-hidden rounded border">
            <div className="h-full w-full select-none" style={{ userSelect: "none" }}>
              <iframe
                src="/manual-2.pdf"
                title="Manual 2"
                className="h-full w-full"
                sandbox="allow-same-origin allow-scripts"
                aria-label="Manual 2 viewer"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-4 py-3">
          <button onClick={onClose} className="rounded bg-slate-100 px-3 py-2 text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}
