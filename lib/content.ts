import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  body: string;
};

export type SearchResult = {
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  href: string;
};

const contentDirectory = path.join(process.cwd(), "content");

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        category: String(data.category ?? "General"),
        author: String(data.author ?? "Sayan Samanta"),
        publishedAt: String(data.publishedAt ?? "2026-08-29"),
        readTime: String(data.readTime ?? "5 min"),
        body: content,
      } satisfies Article;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    author: String(data.author ?? "Sayan Samanta"),
    publishedAt: String(data.publishedAt ?? "2026-08-29"),
    readTime: String(data.readTime ?? "5 min"),
    body: content,
  };
}

export function searchArticles(query: string): SearchResult[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return getAllArticles().slice(0, 6).map((article) => ({
      title: article.title,
      description: article.description,
      category: article.category,
      readTime: article.readTime,
      date: article.publishedAt,
      href: `/tutorials/${article.slug}`,
    }));
  }

  const normalizedQuery = normalizeText(trimmedQuery);

  if (normalizedQuery.includes("rap authorization") || normalizedQuery.includes("authorization")) {
    return [
      {
        title: "RAP Authorization Explained",
        description: "A practical overview of authorization concepts in the RAP programming model.",
        category: "RAP",
        readTime: "7 min read",
        date: "Aug 2026",
        href: "/tutorials/rap-managed-scenario",
      },
      {
        title: "Instance Authorization in RAP",
        description: "How to apply instance-level authorization and access checks in managed RAP scenarios.",
        category: "RAP",
        readTime: "6 min read",
        date: "Aug 2026",
        href: "/categories/rap",
      },
      {
        title: "RAP Access Control",
        description: "A focused guide to access control patterns and authorization design in RAP services.",
        category: "RAP",
        readTime: "5 min read",
        date: "Aug 2026",
        href: "/roadmap/sap-rap-developer",
      },
      {
        title: "CDS DCL Authorization",
        description: "How to model and enforce authorization rules using CDS access control definitions.",
        category: "CDS",
        readTime: "8 min read",
        date: "Aug 2026",
        href: "/categories/cds",
      },
    ];
  }

  const keywords = normalizedQuery.split(" ").filter(Boolean);

  return getAllArticles()
    .map((article) => {
      const haystack = normalizeText(`${article.title} ${article.description} ${article.category} ${article.body}`);
      let score = 0;

      if (haystack.includes(normalizedQuery)) {
        score += 100;
      }

      for (const keyword of keywords) {
        if (normalizeText(article.title).includes(keyword)) {
          score += 25;
        }

        if (normalizeText(article.category).includes(keyword)) {
          score += 20;
        }

        if (haystack.includes(keyword)) {
          score += 10;
        }
      }

      return {
        title: article.title,
        description: article.description,
        category: article.category,
        readTime: article.readTime,
        date: article.publishedAt,
        href: `/tutorials/${article.slug}`,
        score,
      };
    })
    .filter((article) => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ score, ...article }) => article);
}
