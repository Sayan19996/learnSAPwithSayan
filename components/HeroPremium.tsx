"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const HeroModel = dynamic(() => import("./HeroModel"), { ssr: false });

export default function HeroPremium() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = (-y / rect.height) * 12; // rotateX
      const ry = (x / rect.width) * 12; // rotateY
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }

    function onLeave() {
      el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">Learn SAP with craft and clarity</h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">In-depth, practical tutorials and roadmaps — built for real projects. Modern SAP skills, explained clearly with hands-on examples.</p>

            <div className="mt-8 flex gap-4">
              <Link href="/tutorials" className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:from-sky-500 hover:to-indigo-500">Start Learning</Link>
              <Link href="/resources" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm">Resources</Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-30" aria-hidden>
              <div className="absolute left-1/2 top-1/4 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-600 opacity-80 w-[36rem] h-[36rem]" />
            </div>

            <div className="mx-auto w-full max-w-md transform-gpu perspective-1000">
              <div className="relative flex items-center justify-center">
                <div ref={cardRef} className="card-3d group will-change-transform">
                  <div className="card-face card-front">
                    <div className="p-6">
                      <div className="text-sm font-semibold text-sky-600">Hands-on</div>
                      <h3 className="mt-3 text-xl font-bold">Build an SAP RAP app</h3>
                      <p className="mt-2 text-sm text-slate-600">Follow a step-by-step tutorial to build a RAP-managed scenario with Fiori UX.</p>
                    </div>
                  </div>

                  <div className="card-face card-back">
                    <div className="p-6 text-white">
                      <div className="text-sm font-semibold">Premium</div>
                      <h3 className="mt-3 text-xl font-bold">Project-ready examples</h3>
                      <p className="mt-2 text-sm">Patterns, architecture, and delivery tips used by real teams.</p>
                    </div>
                  </div>
                </div>

                {/* 3D model on the right of the card */}
                <div className="absolute right-[-6rem] top-1/2 hidden w-80 -translate-y-1/2 md:block">
                  <HeroModel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
