"use client";

import Link from "next/link";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import TrainingModal from "./TrainingModal";

export type HeaderNavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems?: HeaderNavItem[];
  logo?: string;
  className?: string;
};

export default function Header({
  navItems = [
    { label: "Tutorials", href: "/tutorials" },
    { label: "Roadmaps", href: "/roadmap" },
    { label: "Categories", href: "/categories" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Profile", href: "/profile" },
    { label: "Gen AI App", href: "/genai" },
  ],
  logo = "learnSAPwithSayan.com",
  className = "",
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-transparent bg-gradient-to-r from-white/60 via-white/40 to-slate-50/40 backdrop-blur-md ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden items-center justify-between md:flex md:items-center">
          <Link href="/" className="inline-flex items-center" aria-label="Go to homepage">
            <BrandLogo className="" compact={false} wordmark={logo} />
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-7">
            {navItems.map((item) => {
              const isGen = item.href === "/genai" || /genai/i.test(item.label);
              return isGen ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition-all hover:text-slate-900 hover:scale-105"
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href="/search" aria-label="Search articles" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-white text-lg text-slate-700 shadow-md">
              🔍
            </Link>

            <button
              onClick={() => setTrainingOpen(true)}
              className="ml-2 inline-flex items-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Training: Apply
            </button>

            <Link
              href="/technical-manual"
              className="ml-2 inline-flex items-center rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Technical Solution Manual
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-700 shadow-sm transition-colors hover:border-slate-300"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          <Link href="/" className="inline-flex items-center justify-center" aria-label="Go to homepage">
            <BrandLogo compact wordmark={logo} />
          </Link>

          <Link href="/search" aria-label="Search articles" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-base text-slate-700 shadow-sm">
            🔍
          </Link>
        </div>

        {mobileOpen ? (
          <nav
            aria-label="Mobile navigation"
            className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:hidden"
          >
            {navItems.map((item) => {
              const isGen = item.href === "/genai" || /genai/i.test(item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isGen ? "bg-gradient-to-r from-rose-500 to-indigo-600 text-white" : "text-slate-700 hover:bg-white hover:text-slate-900"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileOpen(false);
                setTrainingOpen(true);
              }}
              className="block rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-2 text-sm font-medium text-white"
            >
              Training: Apply
            </button>
            <Link
              href="/technical-manual"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white"
            >
              Technical Solution Manual
            </Link>
          </nav>
        ) : null}

        {trainingOpen ? <TrainingModal open={trainingOpen} onClose={() => setTrainingOpen(false)} /> : null}
      </div>
    </header>
  );
}
