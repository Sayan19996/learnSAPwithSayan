"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminTopBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id?: string; name?: string; email?: string } | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        setAuthenticated(Boolean(json?.authenticated));
        setUser(json?.user ?? null);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    setOpen(false);
    router.push("/admin/login");
    router.refresh();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "A";

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Content workspace</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{user?.name ? `Welcome, ${user.name}` : "Welcome, Admin"}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          View site
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-haspopup="true"
            aria-expanded={open}
            className="inline-flex items-center gap-3 rounded-full px-2 py-1 hover:bg-slate-50"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-800">
              {initials}
            </div>
            <div className="hidden flex-col text-sm text-slate-700 md:flex">
              <span className="font-medium">{user?.name ?? "Admin"}</span>
              <span className="text-xs text-slate-400">{user?.email ?? ""}</span>
            </div>
            <svg className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            role="menu"
            aria-hidden={!open}
            className={`absolute right-0 z-50 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg transform origin-top-right transition-all duration-150 ease-out ${
              open
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 translate-y-1 pointer-events-none"
            }`}
          >
            <Link
              href="/admin/settings"
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              View site
            </Link>
            <button onClick={handleLogout} className="mt-2 w-full rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
