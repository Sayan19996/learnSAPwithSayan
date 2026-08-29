export default function AdminRoadmapsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Roadmaps</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">SAP Architect learning paths</h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[
            "SAP Fundamentals",
            "ABAP + CDS",
            "RAP",
            "Fiori",
            "BTP",
            "Integration",
            "Architecture",
          ].map((step, index) => (
            <div key={step} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                {index + 1}
              </div>
              <div className="text-base font-semibold text-slate-800">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
