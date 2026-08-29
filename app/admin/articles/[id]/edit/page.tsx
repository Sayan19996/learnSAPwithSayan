import { notFound } from "next/navigation";
import AdminArticleForm from "@/components/AdminArticleForm";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const prisma = getPrisma();
  const article = await prisma.article.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Articles</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Edit tutorial</h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminArticleForm
          mode="edit"
          initialValues={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? "",
            category: article.category?.name ?? "RAP",
            difficulty: article.difficulty ?? "Intermediate",
            readTime: article.readTime ?? "10 min",
            status: article.status ?? "draft",
            featuredImage: article.featuredImage ?? "/og-default.svg",
            content: article.content,
            seoTitle: article.seoTitle ?? "",
            seoDescription: article.seoDescription ?? "",
          }}
        />
      </div>
    </div>
  );
}
