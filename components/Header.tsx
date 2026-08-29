"use client";

import Link from "next/link";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

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
    { label: "Admin", href: "/admin/login" },
    { label: "About", href: "/about" },
  ],
  logo = "learnSAPwithSayan.com",
  className = "",
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`border-b border-slate-200/80 bg-white/90 backdrop-blur-sm ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="hidden items-center justify-between md:flex md:items-center">
          <Link href="/" className="inline-flex items-center" aria-label="Go to homepage">
            <BrandLogo className="" compact={false} wordmark={logo} />
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/search"
              aria-label="Search articles"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-base text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              🔍
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

          <Link
            href="/search"
            aria-label="Search articles"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-base text-slate-700 shadow-sm transition-colors hover:border-slate-300"
          >
            🔍
          </Link>
        </div>

        {mobileOpen ? (
          <nav
            aria-label="Mobile navigation"
            className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
