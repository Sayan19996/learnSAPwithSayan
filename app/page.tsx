import ArticleFeed from "@/components/ArticleFeed";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllArticles } from "@/lib/content";
import Link from "next/link";

const learningPaths = [
  { title: "ABAP", href: "/tutorials/abap-table-expressions", icon: "A", accent: "bg-amber-100 text-amber-700" },
  { title: "Fiori", href: "/tutorials/fiori", icon: "F", accent: "bg-sky-100 text-sky-700" },
  { title: "RAP", href: "/tutorials/rap-managed-scenario", icon: "R", accent: "bg-violet-100 text-violet-700" },
  { title: "BTP", href: "/tutorials/sap-btp-destination", icon: "B", accent: "bg-emerald-100 text-emerald-700" },
  { title: "SD", href: "/tutorials/sd", icon: "S", accent: "bg-cyan-100 text-cyan-700" },
  { title: "Architect", href: "/tutorials/cds-associations", icon: "A", accent: "bg-rose-100 text-rose-700" },
];

const roadmapSteps = [
  "SAP Developer",
  "Modern ABAP",
  "CDS",
  "RAP",
  "Fiori",
  "BTP",
  "Integration",
  "SAP Architect",
];

export default function Home() {
  const latestTutorials = getAllArticles().slice(0, 3).map((article) => ({
    title: article.title,
    description: article.description,
    category: article.category,
    readTime: article.readTime,
    date: article.publishedAt,
    href: `/tutorials/${article.slug}`,
  }));

  const featuredArticle = getAllArticles()[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Learn SAP.
                <span className="mt-2 block">Build Real Solutions.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Practical SAP tutorials covering ABAP, RAP, Fiori, BTP, Integration and Architecture.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tutorials"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
                >
                  Start Learning
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Explore Tutorials
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                {[
                  "ABAP / OO / CDS",
                  "RAP + Fiori UX",
                  "BTP + Integration",
                  "Architecture + Delivery",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Choose your path</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">What do you want to learn?</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {learningPaths.map((item) => (
              <CategoryCard
                key={item.title}
                title={item.title}
                description={`Explore practical ${item.title} learning paths and hands-on examples.`}
                articleCount={4}
                href={item.href}
                icon={item.icon}
                accent={item.accent}
              />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Featured tutorial</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {featuredArticle?.title ?? "Build a QR-Based PGI Application in SAP"}
                </h2>
              </div>

              <Link
                href={featuredArticle ? `/tutorials/${featuredArticle.slug}` : "/tutorials/qr-based-pgi-application"}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Read tutorial
              </Link>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {featuredArticle?.description ?? "This is where your real project experience becomes valuable."}
            </p>
          </div>
        </section>

        <section className="py-12">
          <ArticleFeed
            eyebrow="Latest tutorials"
            title="Latest tutorials"
            articles={latestTutorials}
          />
        </section>

        <section className="py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Career roadmap</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">SAP Developer → SAP Architect</h2>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              {roadmapSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium text-slate-700">
                    {step}
                  </div>
                  {index < roadmapSteps.length - 1 ? (
                    <span className="my-1 text-lg text-slate-400">↓</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Free resources</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">FREE SAP ARCHITECT ROADMAP</h2>

            <div className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Download the complete SAP Developer → Architect roadmap.
            </div>

            <div className="mt-8">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
              >
                Download Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
