import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Terms</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Terms and conditions</h1>

          <div className="mt-8 space-y-5 text-slate-600">
            <p>
              By using this website, you agree to use the content for educational and informational purposes only.
            </p>
            <p>
              We do not guarantee the accuracy or completeness of every tutorial, and users should validate implementation details against official SAP documentation.
            </p>
            <p>
              All content is provided as-is and may be updated or revised without notice.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
