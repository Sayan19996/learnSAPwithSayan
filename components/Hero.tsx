import Link from "next/link";

export type HeroStat = {
  label: string;
  value: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  stats?: HeroStat[];
  className?: string;
};

export default function Hero({
  eyebrow = "Learn SAP with confidence",
  title,
  description = "Build practical skills through clear tutorials, real-world examples, and smart career guidance.",
  primaryAction = { label: "Explore tutorials", href: "/tutorials" },
  secondaryAction = { label: "View roadmap", href: "/roadmap" },
  stats = [
    { value: "40+", label: "Guides" },
    { value: "12", label: "Core topics" },
    { value: "100%", label: "Hands-on" },
  ],
  className = "",
}: HeroProps) {
  return (
    <section className={`bg-gradient-to-br from-slate-50 via-white to-sky-50 ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          {eyebrow ? (
            <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryAction.href}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
            >
              {primaryAction.label}
            </Link>
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-slate-50 p-5 text-center">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Learning path</span>
              <span>Beginner to expert</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" />
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-300">
              <div>• SAP Fiori foundations</div>
              <div>• S/4HANA architecture</div>
              <div>• API and integration patterns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
