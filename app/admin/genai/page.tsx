import { getPrisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";

export default async function AdminGenAiList() {
  const prisma = getPrisma();
  const apps = await prisma.genAiApp.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Gen AI Apps</h1>
        <Link href="/admin/genai/new" className="btn-secondary">New App</Link>
      </div>

      <div className="space-y-4">
        {apps.map((a: any) => (
          <div key={a.id} className="p-4 border rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{a.name} <span className="text-sm text-muted">/{a.slug}</span></div>
              <div className="text-sm text-muted">{a.description}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/genai/${a.slug}`} className="btn">Open</Link>
              <Link href={`/admin/genai/${a.id}/edit`} className="btn-muted">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
