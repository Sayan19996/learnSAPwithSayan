import Link from "next/link";

export type ArticleCardProps = {
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  href: string;
  image?: string;
  className?: string;
};

export default function ArticleCard({
  title,
  description,
  category,
  readTime,
  date,
  href,
  image,
  className = "",
}: ArticleCardProps) {
  return (
    <article className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md ${className}`}>
      {image ? (
        <div className="h-48 overflow-hidden bg-slate-200">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-sky-700">
          <span>{category}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{readTime}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>{date}</span>
          <Link href={href} className="font-semibold text-sky-700">
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
