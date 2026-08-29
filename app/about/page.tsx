import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">About</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Learn SAP with clarity and confidence.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            This site is built to make complex SAP topics more approachable through concise explanations,
            roadmap-based learning, and practical examples that developers and consultants can apply immediately.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Hands-on learning",
              description: "Tutorials are written to focus on real-world SAP challenges rather than theory alone.",
            },
            {
              title: "Career progression",
              description: "Structured pathways help learners move from beginner topics to advanced implementation work.",
            },
            {
              title: "Practical examples",
              description: "Each concept is paired with use cases, patterns, and technical guidance.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
