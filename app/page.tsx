import ArticleFeed from "@/components/ArticleFeed";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroPremiumWrapper from "@/components/HeroPremiumWrapper";
import GenAiCard from "@/components/GenAiCard";
import { getPrisma } from "@/lib/prisma";
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

export default async function Home() {
  const latestTutorials = getAllArticles().slice(0, 3).map((article) => ({
    title: article.title,
    description: article.description,
    category: article.category,
    readTime: article.readTime,
    date: article.publishedAt,
    href: `/tutorials/${article.slug}`,
  }));

  const featuredArticle = getAllArticles()[0];

  const prisma = getPrisma();
  const genai = await prisma.genAiApp.findMany({ where: { status: "published" }, orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Premium hero (client-only) */}
        <section className="mb-12">
          <HeroPremiumWrapper />
        </section>

        <section className="py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Choose your path</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">What do you want to learn?</h2>
            <div className="mt-4 h-1 w-20 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {learningPaths.map((item) => (
              <div key={item.title} className="transition-transform duration-300 hover:scale-[1.02]">
                <CategoryCard
                  title={item.title}
                  description={`Explore practical ${item.title} learning paths and hands-on examples.`}
                  articleCount={4}
                  href={item.href}
                  icon={item.icon}
                  accent={item.accent}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-slate-50 rounded-[3rem] px-6 sm:px-12">
          <div className="rounded-3xl border border-white bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-12 transition-all hover:shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Featured tutorial</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {featuredArticle?.title ?? "Build a QR-Based PGI Application in SAP"}
                </h2>
              </div>

              <Link
                href={featuredArticle ? `/tutorials/${featuredArticle.slug}` : "/tutorials/qr-based-pgi-application"}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-700 hover:shadow-lg active:scale-95"
              >
                Read tutorial
              </Link>
            </div>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-600">
              {featuredArticle?.description ?? "This is where your real project experience becomes valuable."}
            </p>
          </div>
        </section>

        <section className="py-20">
          <ArticleFeed eyebrow="Latest tutorials" title="Latest tutorials" articles={latestTutorials} />
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 flex items-center justify-between mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Generative AI</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">AI apps & demos</h2>
              <p className="mt-2 text-slate-500">Curated tools and demos you can open and try instantly.</p>
            </div>
            <Link href="/genai" className="hidden sm:block text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors underline underline-offset-4">
              See all apps →
            </Link>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {genai.slice(0, 3).map((app: any) => (
              <div key={app.id} className="transition-transform duration-300 hover:scale-[1.02]">
                <GenAiCard app={app} />
              </div>
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link href="/genai" className="text-sm font-bold text-sky-600 underline">See all apps</Link>
          </div>
        </section>

        <section className="py-20">
          <div className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-16 text-center transition-all hover:shadow-md">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Career roadmap</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">SAP Developer → SAP Architect</h2>
              <p className="mt-4 text-slate-500">A structured path to mastering the SAP ecosystem.</p>
            </div>

            <div className="mt-16 flex flex-col items-center gap-0">
              {roadmapSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center group">
                  <div className="rounded-full border-2 border-slate-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all group-hover:border-sky-500 group-hover:text-sky-600 group-hover:shadow-md">
                    {step}
                  </div>
                  {index < roadmapSteps.length - 1 ? (
                    <div className="flex flex-col items-center py-2">
                      <div className="h-8 w-0.5 bg-slate-200 group-hover:bg-sky-300 transition-colors" />
                      <span className="text-slate-300 group-hover:text-sky-400 transition-colors">↓</span>
                      <div className="h-8 w-0.5 bg-slate-200 group-hover:bg-sky-300 transition-colors" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="relative rounded-[3rem] bg-slate-900 p-8 text-white shadow-2xl sm:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Free resources</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">FREE SAP ARCHITECT ROADMAP</h2>

              <div className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-300">
                Stop guessing your career path. Download the complete, industry-verified SAP Developer to Architect roadmap.
              </div>

              <div className="mt-10">
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-bold text-white transition-all hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] active:scale-95"
                >
                  Download Free Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
