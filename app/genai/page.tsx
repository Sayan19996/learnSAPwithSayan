import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GenAiIndex() {
  const prisma = getPrisma();
  const apps = await prisma.genAiApp.findMany({ where: { status: "published" }, orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Generative AI Apps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((a: any) => (
          <div key={a.id} className="p-4 border rounded">
            <div className="flex items-center gap-3">
              {a.icon ? <img src={a.icon} alt="icon" className="w-12 h-12 rounded" /> : <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">AI</div>}
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-sm text-muted">{a.description}</div>
              </div>
            </div>
            <div className="mt-4">
              <a href={a.url} target="_blank" rel="noreferrer" className="btn-primary">Open App</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
