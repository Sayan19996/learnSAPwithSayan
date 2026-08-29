import { getPrisma } from "@/lib/prisma";
import GenAiDetailsClient from "@/components/GenAiDetailsClient";
import Link from "next/link";

export default async function GenAiDetails({ params }: { params: { slug: string } }) {
  const prisma = getPrisma();
  const app = await prisma.genAiApp.findUnique({ where: { slug: params.slug } });
  if (!app) return <div className="p-6">Not found</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-start gap-6">
        {app.icon ? (
          <img src={app.icon} alt={app.name} className="w-28 h-28 rounded-xl object-cover shadow-lg" />
        ) : (
          <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">AI</div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="mt-2 text-slate-600">{app.description}</p>

          <div className="mt-4 flex items-center gap-3">
            <GenAiDetailsClient id={app.id} url={app.url} slug={app.slug} />
            <Link href="/genai" className="text-sm text-slate-500">Back to list</Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-600">
        <strong>URL:</strong>{' '}
        {app.url ? (
          <a className="underline text-sky-600" href={app.url} target="_blank" rel="noreferrer">{app.url}</a>
        ) : (
          <span className="text-slate-500">No URL provided</span>
        )}
      </div>

      {app.longDescription ? (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="prose max-w-none text-slate-700">{app.longDescription}</div>
        </div>
      ) : null}
    </div>
  );
}
