import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.split(";").some((pair) => pair.trim().startsWith("lsw_admin=true"));
}

export async function GET() {
  const prisma = getPrisma();
  const apps = await prisma.genAiApp.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(apps);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, description, url, icon, status } = body;
  if (!name || !slug || !url) {
    return NextResponse.json({ error: "name, slug and url are required" }, { status: 400 });
  }

  const prisma = getPrisma();
  const app = await prisma.genAiApp.create({
    data: { name, slug, description: description ?? "", url, icon: icon ?? "", status: status ?? "published" },
  });

  return NextResponse.json(app, { status: 201 });
}
