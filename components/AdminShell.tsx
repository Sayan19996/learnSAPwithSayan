import Link from "next/link";
import type { ReactNode } from "react";
import AdminTopBar from "@/components/AdminTopBar";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Tutorials", href: "/admin/articles" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Resources", href: "/admin/resources" },
  { label: "Roadmaps", href: "/admin/roadmaps" },
  { label: "Media", href: "/admin/media" },
  { label: "Gen AI Apps", href: "/admin/genai" },
  { label: "Settings", href: "/admin/settings" },
];

type AdminShellProps = {
  children: ReactNode;
  title?: string;
};

export default function AdminShell({ children, title = "LearnSAPWithSayan Admin" }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-slate-950 text-slate-200 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <Link href="/admin" className="text-lg font-bold tracking-tight text-white">
              {title}
            </Link>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-sm">
            <AdminTopBar />
          </header>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
