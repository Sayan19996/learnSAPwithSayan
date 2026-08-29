import { getPrisma } from "@/lib/prisma";
import AdminGenAiForm from "@/components/AdminGenAiForm";
import React from "react";

export default async function EditGenAi({ params }: { params: { id: string } }) {
  const prisma = getPrisma();
  const app = await prisma.genAiApp.findUnique({ where: { id: params.id } });
  if (!app) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Gen AI App</h1>
      <AdminGenAiForm initial={app} />
    </div>
  );
}
