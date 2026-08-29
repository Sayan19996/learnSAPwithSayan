import CategoryFeed from "@/components/CategoryFeed";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const categories = [
  {
    title: "SAP ABAP",
    description: "Build robust application logic, data processing, and enterprise APIs in ABAP.",
    articleCount: 2,
    href: "/categories/abap",
    icon: "A",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    title: "SAP CDS",
    description: "Model semantic data and business logic with CDS views and associations.",
    articleCount: 1,
    href: "/categories/cds",
    icon: "C",
    accent: "bg-rose-100 text-rose-700",
  },
  {
    title: "SAP RAP",
    description: "Learn modern ABAP service design from fundamentals to production-ready architecture.",
    articleCount: 1,
    href: "/categories/rap",
    icon: "R",
    accent: "bg-violet-100 text-violet-700",
  },
  {
    title: "SAP Fiori",
    description: "Create intuitive enterprise experiences with SAPUI5 and Fiori design patterns.",
    articleCount: 1,
    href: "/categories/fiori",
    icon: "F",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    title: "SAP BTP",
    description: "Connect business services, extension points, and cloud-native integration patterns.",
    articleCount: 1,
    href: "/categories/btp",
    icon: "B",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Integration",
    description: "Understand APIs, interfaces, and process orchestration across SAP landscapes.",
    articleCount: 1,
    href: "/categories/integration",
    icon: "I",
    accent: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "SAP SD",
    description: "Understand sales and distribution processes in enterprise SAP implementations.",
    articleCount: 1,
    href: "/categories/sd",
    icon: "S",
    accent: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Architecture",
    description: "Design scalable SAP landscapes, process flows, and enterprise solution blueprints.",
    articleCount: 1,
    href: "/categories/architecture",
    icon: "A",
    accent: "bg-slate-200 text-slate-700",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <CategoryFeed
          eyebrow="Browse by topic"
          title="Explore SAP learning paths"
          description="From ABAP fundamentals to enterprise architecture, follow the path that matches your goals."
          categories={categories}
          align="center"
        />
      </main>
      <Footer />
    </div>
  );
}
