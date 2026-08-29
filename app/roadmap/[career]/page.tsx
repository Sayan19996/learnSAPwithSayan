import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllArticles } from "@/lib/content";
import Link from "next/link";

const roadmapMap = {
  "sap-abap-developer": {
    title: "SAP ABAP Developer",
    summary: "Start with enterprise business understanding, then move into ABAP logic, data modeling, and scalable application delivery.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Understand SAP architecture, enterprise flows, and the business context behind technical implementation.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/tutorials/abap-table-expressions",
        description: "Learn ABAP foundations and CDS modeling patterns for structured, maintainable SAP applications.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/categories/rap",
        description: "Build modern business services with RAP and expose them through responsive user experiences.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/categories/btp",
        description: "Connect business services and platform capabilities with integration, APIs, and cloud extension patterns.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Translate business needs into scalable SAP solution design and robust enterprise architecture.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Lead large-scale enterprise design decisions across business processes, technology, and governance.",
      },
    ],
  },
  "sap-rap-developer": {
    title: "SAP RAP Developer",
    summary: "Move from ABAP fundamentals to managed business objects, OData exposure, and production-ready service design.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Build your understanding of SAP business semantics, enterprise design, and technical context.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/tutorials/abap-table-expressions",
        description: "Solidify the logic and data modeling layer required for modern ABAP application design.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/tutorials/rap-managed-scenario",
        description: "Master managed RAP behavior, service exposure, and user-facing business flows.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/categories/btp",
        description: "Integrate RAP services with platform services and enterprise extension patterns.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Design resilient and maintainable SAP service landscapes.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Scale RAP into business-critical enterprise architecture decisions across domains.",
      },
    ],
  },
  "sap-fiori-developer": {
    title: "SAP Fiori Developer",
    summary: "Design clean user experiences on top of SAP business logic and expose them through modern enterprise UX patterns.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Learn the business context, app expectations, and enterprise process model behind Fiori design.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/categories/cds",
        description: "Understand the data model that powers Fiori applications and business scenarios.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/categories/rap",
        description: "Connect business services with clean UI patterns that support end-user productivity.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/categories/btp",
        description: "Use platform and integration services to connect Fiori apps into broader enterprise flows.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Design user-centric application landscapes with strong UX and enterprise consistency.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Define scalable UX architecture across systems, roles, and platform standards.",
      },
    ],
  },
  "sap-btp-developer": {
    title: "SAP BTP Developer",
    summary: "Combine SAP business services with cloud-native extension, API-first thinking, and platform automation.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Understand the enterprise context and technical foundations behind digital transformation.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/categories/cds",
        description: "Model business data effectively before extending it through the platform layer.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/categories/rap",
        description: "Create enterprise services and modern business experiences with the SAP application model.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/tutorials/sap-btp-destination",
        description: "Work with BTP destinations and integration patterns to build connected cloud solutions.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Shape platform-level architecture decisions for resilience, security, and scale.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Guide cloud and enterprise architecture strategy across business and technical domains.",
      },
    ],
  },
  "sap-integration-consultant": {
    title: "SAP Integration Consultant",
    summary: "Connect SAP ecosystems through APIs, middleware, business process flows, and cross-system design thinking.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Understand the SAP business landscape and how systems interact in real enterprise operations.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/categories/cds",
        description: "Learn how data and logic are modeled from a source-system perspective.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/categories/rap",
        description: "Understand service interfaces and application integration patterns from the source system side.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/categories/btp",
        description: "Design, secure, and orchestrate interactions across SAP and non-SAP services.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Create integration architecture that supports business continuity and system agility.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Define long-term integration strategy that connects enterprise transformation goals to technical delivery.",
      },
    ],
  },
  "sap-solution-architect": {
    title: "SAP Solution Architect",
    summary: "Move from technical depth to enterprise-wide decision making across application, integration, architecture, and business strategy.",
    levels: [
      {
        title: "Level 1",
        label: "SAP Fundamentals",
        href: "/categories/abap",
        description: "Develop the enterprise understanding that underpins architectural judgment.",
      },
      {
        title: "Level 2",
        label: "ABAP + CDS",
        href: "/categories/cds",
        description: "Understand core implementation patterns and the data foundations that shape business systems.",
      },
      {
        title: "Level 3",
        label: "RAP + Fiori",
        href: "/categories/rap",
        description: "Evaluate application architecture through service design, UX, and business process enablement.",
      },
      {
        title: "Level 4",
        label: "BTP + Integration",
        href: "/categories/btp",
        description: "Decide how cloud services, integrations, and extensions work together across the landscape.",
      },
      {
        title: "Level 5",
        label: "Architecture",
        href: "/categories/architecture",
        description: "Create scalable solution blueprints balancing business value, technical trade-offs, and delivery realities.",
      },
      {
        title: "Level 6",
        label: "Enterprise Architecture",
        href: "/categories/architecture",
        description: "Lead the enterprise strategy that aligns applications, processes, data, and governance.",
      },
    ],
  },
} as const;

type PageProps = {
  params: Promise<{ career: string }>;
};

export async function generateStaticParams() {
  return Object.keys(roadmapMap).map((career) => ({ career }));
}

export default async function Page({ params }: PageProps) {
  const { career } = await params;
  const route = roadmapMap[career as keyof typeof roadmapMap];

  if (!route) {
    return null;
  }

  const articlePool = getAllArticles();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Roadmap", href: "/roadmap" },
            { label: route.title },
          ]}
        />

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Career roadmap</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{route.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{route.summary}</p>
        </section>

        <section className="mt-12">
          <div className="flex flex-col items-center gap-5">
            {route.levels.map((level, index) => (
              <div key={level.title} className="flex w-full max-w-4xl flex-col items-center">
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-sky-700">{level.title}</p>
                      <h2 className="mt-2 text-2xl font-bold text-slate-900">{level.label}</h2>
                    </div>
                    <Link
                      href={level.href}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                    >
                      Explore articles
                    </Link>
                  </div>

                  <p className="mt-4 text-base leading-7 text-slate-600">{level.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {articlePool.slice(index, index + 2).map((article) => (
                      <Link
                        key={article.slug}
                        href={`/tutorials/${article.slug}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {index < route.levels.length - 1 ? (
                  <div className="my-2 text-2xl text-slate-400">↓</div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
