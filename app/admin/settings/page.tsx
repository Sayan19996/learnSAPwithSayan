export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Settings</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Admin preferences</h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4 text-sm text-slate-700">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span>SEO defaults</span>
            <span className="font-semibold text-emerald-700">Enabled</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span>Content review flow</span>
            <span className="font-semibold text-sky-700">Draft → Publish</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span>Authentication</span>
            <span className="font-semibold text-amber-700">Admin-only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
