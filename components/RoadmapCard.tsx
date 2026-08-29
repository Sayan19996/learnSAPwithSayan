export type RoadmapCardProps = {
  step: number;
  title: string;
  description: string;
  status?: "completed" | "active" | "upcoming";
  className?: string;
};

export default function RoadmapCard({
  step,
  title,
  description,
  status = "upcoming",
  className = "",
}: RoadmapCardProps) {
  const statusStyles = {
    completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
    active: "border-sky-200 bg-sky-50 text-sky-700",
    upcoming: "border-slate-200 bg-slate-50 text-slate-600",
  };

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {step}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
