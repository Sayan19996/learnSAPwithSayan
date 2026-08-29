export type TocItem = {
  id: string;
  label: string;
  level?: number;
};

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export default function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  return (
    <aside className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">On this page</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const level = item.level ?? 1;

          return (
            <li key={item.id} style={{ marginLeft: `${(level - 1) * 12}px` }}>
              <a href={`#${item.id}`} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
