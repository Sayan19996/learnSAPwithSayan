import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.split(";").some((pair) => pair.trim().startsWith("lsw_admin=true"));
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const prisma = getPrisma();
  const article = await prisma.article.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const prisma = getPrisma();

  const article = await prisma.article.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      difficulty: body.difficulty ?? "Intermediate",
      readTime: body.readTime ?? "10 min",
      featuredImage: body.featuredImage ?? "/og-default.svg",
      seoTitle: body.seoTitle ?? body.title,
      seoDescription: body.seoDescription ?? body.excerpt ?? "",
      status: body.status ?? "draft",
      publishedAt: body.status === "published" ? new Date() : null,
    },
    include: { category: true },
  });

  return NextResponse.json(article);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const prisma = getPrisma();
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
