import { getPrisma } from "@/lib/prisma";
import GenAiCard from "@/components/GenAiCard";

export default async function GenAiIndex() {
  const prisma = getPrisma();
  const apps = await prisma.genAiApp.findMany({ where: { status: "published" }, orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Generative AI Apps</h1>
        <p className="text-sm text-slate-500">Curated list of useful GenAI tools and demos. Add yours via the admin.</p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((a: any) => (
            <GenAiCard key={a.id} app={a} />
          ))}
          <GenAiCard 
            app={{
              id: 'ai-business-autopsy',
              name: 'AI Business Autopsy',
              slug: 'ai-business-autopsy',
              description: 'Analyze business failures and successes using AI to derive actionable insights.',
              url: 'https://agent-6a9471e0dcfc9bd7981f9--ai-business-autopsy.netlify.app/',
              status: 'published'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
