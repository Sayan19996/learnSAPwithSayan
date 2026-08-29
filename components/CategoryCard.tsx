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
    <Link href={href} className={`group block card-3d rounded-2xl ${className}`}>
      <div className="card-face card-front p-6">
        <div className="flex items-start justify-between gap-4">
          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold bg-gradient-to-br from-sky-400 to-indigo-500 text-white`}>{icon}</span>
          <span className="rounded-full bg-slate-100/60 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">{articleCount} articles</span>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
          Explore category
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
