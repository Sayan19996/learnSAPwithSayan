import Link from "next/link";
import BrandLogo from "./BrandLogo";

export type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

type FooterProps = {
  columns?: FooterColumn[];
  brand?: string;
  description?: string;
  copyright?: string;
  className?: string;
};

export default function Footer({
  columns = [
    {
      title: "Explore",
      links: [
        { label: "Tutorials", href: "/tutorials" },
        { label: "Categories", href: "/categories" },
        { label: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "/resources" },
        { label: "Newsletter", href: "/#newsletter" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  brand = "Learn SAP with Sayan",
  description = "Practical SAP learning guides, tutorials, and career roadmaps for developers and consultants.",
  copyright = "© 2026 Learn SAP with Sayan. All rights reserved.",
  className = "",
}: FooterProps) {
  return (
    <footer className={`mt-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tl from-slate-900/90 via-indigo-900/70 to-slate-800/80 p-8 shadow-2xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="space-y-4 text-slate-100">
              <Link href="/" className="inline-flex items-center" aria-label="Go to homepage">
                <BrandLogo className="scale-[0.95] origin-left text-white" wordmark={brand} />
              </Link>
              <p className="max-w-sm text-sm leading-6 text-slate-300">{description}</p>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">
                  {column.title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-slate-300 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-400">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
