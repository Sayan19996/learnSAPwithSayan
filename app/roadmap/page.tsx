import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const roadmapPaths = [
  {
    slug: "sap-abap-developer",
    title: "SAP ABAP Developer",
    description: "Build enterprise logic, classic ABAP patterns, and modern application fundamentals.",
  },
  {
    slug: "sap-rap-developer",
    title: "SAP RAP Developer",
    description: "Learn the modern SAP business application model and transactional service design.",
  },
  {
    slug: "sap-fiori-developer",
    title: "SAP Fiori Developer",
    description: "Create business-friendly experiences using SAPUI5 and Fiori principles.",
  },
  {
    slug: "sap-btp-developer",
    title: "SAP BTP Developer",
    description: "Extend SAP landscapes with cloud services, APIs, and scalable integration patterns.",
  },
  {
    slug: "sap-integration-consultant",
    title: "SAP Integration Consultant",
    description: "Connect applications, systems, and business processes into a single enterprise architecture.",
  },
  {
    slug: "sap-solution-architect",
    title: "SAP Solution Architect",
    description: "Shape end-to-end enterprise design across business, process, integration, and platform layers.",
  },
] as const;

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Roadmap" }]} />

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Roadmap</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Build an SAP career path that scales.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Follow a structured path from fundamentals to enterprise architecture, with each stage connected to tutorials and practical learning resources.
          </p>
        </section>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {roadmapPaths.map((path) => (
              <Link
                key={path.slug}
                href={`/roadmap/${path.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                    {path.title.split(" ")[1]?.slice(0, 2) ?? "SAP"}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">Track</span>
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-900">{path.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{path.description}</p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                  View roadmap
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
