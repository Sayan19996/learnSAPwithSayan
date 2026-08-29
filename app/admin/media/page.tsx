export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Media</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Image and asset library</h2>
        </div>
        <button className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white">Upload media</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {['RAP', 'BTP', 'ABAP', 'Fiori', 'CDS', 'Architect'].map((label) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-28 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500">
              {label}
            </div>
            <div className="mt-3 text-sm font-medium text-slate-700">{label} cover</div>
          </div>
        ))}
      </div>
    </div>
  );
}
