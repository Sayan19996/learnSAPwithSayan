import ArticleFeed from "@/components/ArticleFeed";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllArticles } from "@/lib/content";
import Link from "next/link";

const categoryMeta: Record<string, { title: string; description: string; levels: string[] }> = {
  abap: {
    title: "SAP ABAP",
    description: "Learn SAP ABAP from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  cds: {
    title: "SAP CDS",
    description: "Learn SAP CDS from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  rap: {
    title: "SAP RAP",
    description: "Learn SAP RAP from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  fiori: {
    title: "SAP Fiori",
    description: "Learn SAP Fiori from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  btp: {
    title: "SAP BTP",
    description: "Learn SAP BTP from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  integration: {
    title: "Integration",
    description: "Learn integration from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  sd: {
    title: "SAP SD",
    description: "Learn SAP SD from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  architecture: {
    title: "Architecture",
    description: "Learn architecture from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
};

const articleCategoryMap: Record<string, string> = {
  abap: "ABAP",
  cds: "CDS",
  rap: "RAP",
  fiori: "Fiori",
  btp: "BTP",
  integration: "Integration",
  sd: "SD",
  architecture: "Architecture",
};

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const slug = category.toLowerCase();
  const config = categoryMeta[slug] ?? {
    title: category
      .split("-")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" "),
    description: "Learn this SAP topic from fundamentals through production architecture.",
    levels: ["Beginner", "Intermediate", "Advanced"],
  };

  const categoryArticles = getAllArticles().filter(
    (article) => article.category === articleCategoryMap[slug] || article.category.toLowerCase() === slug,
  );

  const fallbackFeatured = {
    title: `Understanding ${config.title} Architecture`,
    description: `A practical look at how ${config.title.toLowerCase()} fits into real SAP solution design and delivery.`,
    category: config.title,
    readTime: "8 min",
    date: "2026-08-29",
    href: "/tutorials",
  };

  const featuredArticle =
    categoryArticles[0] ?? {
      title: fallbackFeatured.title,
      description: fallbackFeatured.description,
      category: fallbackFeatured.category,
      readTime: fallbackFeatured.readTime,
      publishedAt: fallbackFeatured.date,
      slug: "tutorials",
    };

  const latestArticles = (categoryArticles.length > 0 ? categoryArticles : getAllArticles())
    .slice(0, 4)
    .map((article) => ({
      title: article.title,
      description: article.description,
      category: article.category,
      readTime: article.readTime,
      date: article.publishedAt,
      href: `/tutorials/${article.slug}`,
    }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: config.title },
          ]}
        />

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Category</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{config.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{config.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {config.levels.map((level) => (
              <span
                key={level}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {level}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Featured</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{featuredArticle.title}</h2>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-sky-700">{featuredArticle.category}</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{featuredArticle.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{featuredArticle.readTime}</span>
              <span>•</span>
              <span>{featuredArticle.publishedAt}</span>
            </div>
            <div className="mt-6">
              <Link
                href={featuredArticle.slug === "tutorials" ? "/tutorials" : `/tutorials/${featuredArticle.slug}`}
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Read lesson
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <ArticleFeed
            eyebrow="Latest"
            title={`Latest ${config.title} tutorials`}
            description="A focused reading path for applying this SAP topic in real business scenarios."
            articles={latestArticles}
            columns="3"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
