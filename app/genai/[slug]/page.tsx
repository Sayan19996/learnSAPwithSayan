import { getPrisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function GenAiRedirect({ params }: { params: { slug: string } }) {
  const prisma = getPrisma();
  const app = await prisma.genAiApp.findUnique({ where: { slug: params.slug } });
  if (!app) return <div className="p-6">Not found</div>;
  // Redirect to the external url
  redirect(app.url);
}
