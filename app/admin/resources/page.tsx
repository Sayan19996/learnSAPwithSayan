import { defaultResources } from "@/lib/admin-data";

export default function AdminResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Resources</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Download assets and guides</h2>
        </div>
        <button className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">+ New Resource</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {defaultResources.map((resource) => (
          <div key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xl font-bold text-slate-900">{resource.title}</div>
            <div className="mt-2 text-sm text-slate-600">{resource.description}</div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{resource.kind}</span>
              <span className="font-medium text-emerald-700">{resource.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
