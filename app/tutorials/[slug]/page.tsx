import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { mdxComponents } from "@/components/MDXComponents";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { buildArticleJsonLd, buildArticleMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = buildArticleMetadata(slug);

  if (!metadata) {
    return {
      title: "Article not found",
    };
  }

  return metadata;
}

const formatUpdatedDate = (dateString: string) => {
  const parsed = new Date(dateString);

  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const toc = [
    { id: "introduction", label: "Introduction", level: 1 },
    { id: "what-is-rap", label: "What is RAP?", level: 1 },
    { id: "architecture", label: "Architecture", level: 1 },
    { id: "implementation", label: "Implementation", level: 1 },
    { id: "common-errors", label: "Common Errors", level: 1 },
    { id: "best-practices", label: "Best Practices", level: 1 },
    { id: "interview-questions", label: "Interview Questions", level: 1 },
    { id: "key-takeaways", label: "Key Takeaways", level: 1 },
    { id: "related-tutorials", label: "Related Tutorials", level: 1 },
  ];

  const jsonLdArticle = buildArticleJsonLd(slug);
  const jsonLdBreadcrumb = buildBreadcrumbJsonLd(slug);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {jsonLdArticle ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
          />
        ) : null}
        {jsonLdBreadcrumb ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
          />
        ) : null}

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tutorials", href: "/tutorials" },
            { label: article.title },
          ]}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="sticky top-6 h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">On this page</h2>
            <ul className="mt-4 space-y-2">
              {toc.map((item) => (
                <li key={item.id} style={{ marginLeft: `${(item.level ?? 1) * 12}px` }}>
                  <a href={`#${item.id}`} className="text-sm text-slate-600 hover:text-slate-900">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="rounded-3xl bg-white p-8 shadow-[0_16px_35px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">{article.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{article.readTime} read</span>
              <span>·</span>
              <span>Updated {formatUpdatedDate(article.publishedAt)}</span>
            </div>

            <div className="mt-8 max-w-none">
              <MDXRemote source={article.body} components={mdxComponents} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
