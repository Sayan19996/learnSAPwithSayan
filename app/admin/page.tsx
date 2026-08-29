import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const prisma = getPrisma();
  const [articles, categories, resources] = (await Promise.all([
    prisma.article.findMany({ orderBy: { updatedAt: "desc" }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.resource.findMany({ orderBy: { createdAt: "desc" } }),
  ])) as any;

  const articleCount = articles.length;
  const publishedCount = articles.filter((article: any) => article.status === "published").length;
  const draftCount = articles.filter((article: any) => article.status === "draft").length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Articles", value: articleCount, accent: "bg-sky-100 text-sky-700" },
          { label: "Drafts", value: draftCount, accent: "bg-amber-100 text-amber-700" },
          { label: "Resources", value: resources.length, accent: "bg-emerald-100 text-emerald-700" },
        ].map((stat: any) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stat.accent}`}>
              {stat.label}
            </div>
            <div className="mt-4 text-4xl font-black tracking-tight text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Latest Articles</h2>
            <Link href="/admin/articles/new" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              New Article
            </Link>
          </div>

          <div className="space-y-4">
            {articles.map((article: any) => (
              <div key={article.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{article.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{article.category?.name ?? "Uncategorized"} • {article.status}</div>
                </div>

                <Link href={`/admin/articles/${article.id}/edit`} className="text-sm font-semibold text-sky-700">
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Categories</h2>

          <div className="mt-5 space-y-3">
            {categories.map((category: any) => (
              <div key={category.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span className="text-sm font-medium text-slate-700">{category.name}</span>
                <span className="text-xs uppercase tracking-[0.12em] text-slate-400">{category.slug}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
