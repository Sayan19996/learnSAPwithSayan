import Link from "next/link";

export type CategoryCardProps = {
  title: string;
  description: string;
  articleCount: number;
  href: string;
  icon?: string;
  accent?: string;
  className?: string;
};

export default function CategoryCard({
  title,
  description,
  articleCount,
  href,
  icon = "◆",
  accent = "bg-sky-100 text-sky-700",
  className = "",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${accent}`}>
          {icon}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {articleCount} articles
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
        Explore category
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
