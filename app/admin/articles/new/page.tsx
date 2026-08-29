import AdminArticleForm from "@/components/AdminArticleForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewArticlePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Articles</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create new tutorial</h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminArticleForm mode="create" />
      </div>
    </div>
  );
}
