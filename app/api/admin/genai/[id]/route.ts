import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.split(";").some((pair) => pair.trim().startsWith("lsw_admin=true"));
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prisma = getPrisma();
  const app = await prisma.genAiApp.findUnique({ where: { id } });
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(app);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const prisma = getPrisma();
  const app = await prisma.genAiApp.update({ where: { id }, data: body });
  return NextResponse.json(app);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const prisma = getPrisma();
  await prisma.genAiApp.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
