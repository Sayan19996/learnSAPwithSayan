import ArticleGrid from "@/components/ArticleGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const articles = [
  {
    title: "What is SAP Fiori and why does it matter?",
    description: "A practical guide to understanding the user experience layer of modern SAP applications.",
    category: "Fiori",
    readTime: "5 min read",
    date: "Aug 12, 2026",
    href: "/tutorials/fiori-overview",
  },
  {
    title: "S/4HANA architecture explained simply",
    description: "Learn the architectural building blocks behind SAP’s digital core and how they differ from legacy designs.",
    category: "S/4HANA",
    readTime: "7 min read",
    date: "Aug 18, 2026",
    href: "/tutorials/s4hana-architecture",
  },
  {
    title: "Integration patterns for SAP systems",
    description: "Discover APIs, event-driven exchange, and middleware strategies used in enterprise landscapes.",
    category: "Integration",
    readTime: "6 min read",
    date: "Aug 24, 2026",
    href: "/tutorials/integration-patterns",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Resources</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Curated SAP learning resources</h1>
        </div>

        <ArticleGrid articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
