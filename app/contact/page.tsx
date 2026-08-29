import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Contact</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Let’s connect</h1>
          <p className="mt-4 text-lg text-slate-600">
            Reach out for course collaboration, topic ideas, or feedback on the learning content.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Email</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">hello@learnsapwithsayan.com</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Location</h2>
              <p className="mt-3 text-lg font-medium text-slate-900">Remote / Global</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
