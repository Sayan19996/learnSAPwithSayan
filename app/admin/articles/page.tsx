import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function AdminArticlesPage() {
  await requireAdmin();

  const prisma = getPrisma();
  const articles = (await prisma.article.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  })) as any[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Articles</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Manage tutorials</h2>
        </div>

        <Link href="/admin/articles/new" className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500">
          + New Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Title</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Category</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Status</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Updated</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-800">{article.title}</div>
                  <div className="text-sm text-slate-500">/{article.slug}</div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{article.category?.name ?? "Uncategorized"}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {article.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{new Date(article.updatedAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/articles/${article.id}/edit`} className="font-semibold text-sky-700">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
