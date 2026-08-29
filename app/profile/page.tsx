import Link from "next/link";

export const metadata = {
  title: "Profile — learnSAPwithSayan",
  description: "Profile and CV",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Profile</h1>
        <p className="mt-2 text-slate-600">Public profile and downloadable CV.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
          <iframe
            src="/CV.pdf"
            title="CV"
            className="h-full w-full rounded-xl"
            aria-label="Embedded CV viewer"
          >
            <p className="p-4">If the PDF does not load, you can download it below.</p>
          </iframe>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Sayan — Solution Architect</h2>
            <p className="mt-2 text-slate-600">Experienced SAP consultant, trainer, and content creator focused on SAP development, BTP, and integration patterns.</p>

            <ul className="mt-6 space-y-3">
              <li><strong>Email:</strong> hello@learnsapwithsayan.com</li>
              <li><strong>Location:</strong> Remote / India</li>
              <li><strong>Website:</strong> <Link href="/">learnsapwithsayan.com</Link></li>
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a href="/CV.pdf" className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95" target="_blank" rel="noreferrer">
              Download CV
            </a>

            <span className="text-sm text-slate-500">If the CV is not present, upload `CV.pdf` to the <code className="rounded bg-slate-100 px-1 py-0.5">public/</code> folder.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
