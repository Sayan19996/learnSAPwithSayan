import Link from "next/link";

export default function GenAiCard({ app }: { app: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        {app.icon ? (
          <img src={app.icon} alt={app.name} className="w-14 h-14 rounded-lg object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-semibold">AI</div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{app.name}</h3>
            <div className="text-xs text-slate-500">{app.type ?? "Tool"}</div>
          </div>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{app.description}</p>

          {app.url ? (
            <div className="mt-2 text-xs text-slate-500">
              <a href={app.url} target="_blank" rel="noreferrer" className="underline">
                {(() => {
                  try {
                    return new URL(app.url).hostname.replace(/^www\./, "");
                  } catch (e) {
                    return app.url;
                  }
                })()}
              </a>
            </div>
          ) : null}

          <div className="mt-4 flex items-center gap-3">
            <a href={app.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white">Open App</a>
            <Link href={`/genai/${app.slug}`} className="text-sm text-slate-600 underline">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
