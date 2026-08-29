import Link from "next/link";
import TechnicalManualView from "@/components/TechnicalManualView";

export const metadata = {
  title: "Technical Solution Manual — learnSAPwithSayan",
  description: "View-only technical manuals",
};

export default function TechnicalManualPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Technical Solution Manual</h1>
        <Link href="/" className="text-sm text-slate-600">Home</Link>
      </div>

      <p className="mb-6 text-slate-600">Two view-only manuals are displayed below. Downloading is disabled in-browser; screenshots may still be possible.</p>

      <TechnicalManualView />
    </main>
  );
}
