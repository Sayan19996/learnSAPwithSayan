import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.split(";").some((pair) => pair.trim().startsWith("lsw_admin=true"));
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();
  const articles = await prisma.article.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    slug,
    excerpt,
    content,
    category,
    difficulty,
    readTime,
    featuredImage,
    seoTitle,
    seoDescription,
    status,
  } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
  }

  let categoryRecord = null;
  if (category) {
    const prisma = getPrisma();
    categoryRecord = await prisma.category.upsert({
      where: { slug: String(category).toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name: String(category),
        slug: String(category).toLowerCase().replace(/\s+/g, "-"),
        description: `${String(category)} tutorial content`,
      },
    });
  }
  const prisma2 = getPrisma();

  const article = await prisma2.article.create({
    data: {
      title,
      slug,
      excerpt: excerpt ?? "",
      content,
      difficulty: difficulty ?? "Intermediate",
      readTime: readTime ?? "10 min",
      featuredImage: featuredImage ?? "/og-default.svg",
      seoTitle: seoTitle ?? title,
      seoDescription: seoDescription ?? excerpt ?? "",
      status: status ?? "draft",
      publishedAt: status === "published" ? new Date() : null,
      categoryId: categoryRecord?.id ?? null,
    },
    include: { category: true },
  });

  return NextResponse.json(article, { status: 201 });
}
