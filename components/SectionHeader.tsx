type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg text-slate-600">{description}</p> : null}
    </div>
  );
}
