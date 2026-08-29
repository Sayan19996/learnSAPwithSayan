export type ArticleStatus = "draft" | "published" | "archived";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  difficulty: Difficulty;
  readTime: string;
  status: ArticleStatus;
  featuredImage: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  kind: "PDF" | "Checklist" | "Template";
  price: string;
  status: ArticleStatus;
};

export const defaultCategories: Category[] = [
  { id: "abap", name: "ABAP", slug: "abap", description: "Core ABAP, modern syntax, and performance patterns." },
  { id: "cds", name: "CDS", slug: "cds", description: "Data modeling and CDS view design." },
  { id: "rap", name: "RAP", slug: "rap", description: "Managed and unmanaged RAP implementations." },
  { id: "fiori", name: "Fiori", slug: "fiori", description: "UX, OData, and responsive UI patterns." },
  { id: "btp", name: "BTP", slug: "btp", description: "BTP integration and destination architecture." },
  { id: "integration", name: "Integration", slug: "integration", description: "Interfaces, APIs, and event-driven flows." },
  { id: "sd", name: "SAP SD", slug: "sap-sd", description: "Sales and distribution concepts and business processes." },
  { id: "architecture", name: "Architecture", slug: "architecture", description: "Designing scalable SAP landscapes." },
];

export const defaultArticles: Article[] = [
  {
    id: "rap-managed-scenario",
    title: "SAP RAP Managed Scenario",
    slug: "sap-rap-managed-scenario",
    excerpt: "A practical guide to using managed RAP scenarios with authorization and behavior implementation.",
    category: "RAP",
    difficulty: "Intermediate",
    readTime: "10 min",
    status: "published",
    featuredImage: "/og-default.svg",
    content: "# SAP RAP Managed Scenario\n\nRAP is the modern ABAP approach for building business applications with semantics and service exposure in mind.\n\n## What is managed RAP?\n\nManaged RAP provides a stronger contract for business logic, authorization, and data access patterns.\n\n```abap\ndefine behavior for ZI_SalesOrder\n{\n  create;\n  update;\n  delete;\n\n  action approve;\n}\n```",
    seoTitle: "SAP RAP Managed Scenario – Complete Guide",
    seoDescription: "Learn how to build and secure managed RAP scenarios in SAP with practical examples and architecture guidance.",
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
  },
  {
    id: "modern-abap-expressions",
    title: "Modern ABAP Expressions",
    slug: "modern-abap-expressions",
    excerpt: "Modern expressions simplify business logic and make ABAP code easier to read and maintain.",
    category: "ABAP",
    difficulty: "Intermediate",
    readTime: "8 min",
    status: "published",
    featuredImage: "/og-default.svg",
    content: "# Modern ABAP Expressions\n\nABAP has evolved to support cleaner and more expressive patterns for everyday logic.",
    seoTitle: "Modern ABAP Expressions Guide",
    seoDescription: "Discover modern ABAP expressions and best practices for cleaner business logic in SAP development.",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-25",
  },
  {
    id: "btp-destination-guide",
    title: "SAP BTP Destination Guide",
    slug: "sap-btp-destination",
    excerpt: "Understand how destinations are configured and consumed across SAP BTP and backend services.",
    category: "BTP",
    difficulty: "Beginner",
    readTime: "7 min",
    status: "draft",
    featuredImage: "/og-default.svg",
    content: "# SAP BTP Destination Guide\n\nDestinations are an important part of secure service connectivity in SAP BTP.",
    seoTitle: "SAP BTP Destination Guide",
    seoDescription: "Learn how to configure and use SAP BTP destinations for secure backend integration and app connectivity.",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-18",
  },
];

export const defaultResources: Resource[] = [
  {
    id: "rap-interview-questions",
    title: "SAP RAP Interview Questions",
    description: "100 practical RAP interview questions for developers and consultants.",
    category: "RAP",
    kind: "PDF",
    price: "Free",
    status: "published",
  },
  {
    id: "abap-cheat-sheet",
    title: "ABAP Quick Reference",
    description: "A compact cheat sheet for common ABAP patterns and syntax.",
    category: "ABAP",
    kind: "Checklist",
    price: "Free",
    status: "published",
  },
];

export const STORAGE_KEY = "learnsap-admin-data";

export function getSeedData() {
  return {
    articles: defaultArticles,
    categories: defaultCategories,
    resources: defaultResources,
  };
}

export function loadAdminData() {
  if (typeof window === "undefined") {
    return getSeedData();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getSeedData();
    return JSON.parse(raw) as { articles: Article[]; categories: Category[]; resources: Resource[] };
  } catch {
    return getSeedData();
  }
}

export function saveAdminData(data: { articles: Article[]; categories: Category[]; resources: Resource[] }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createArticle(article: Article) {
  const snapshot = loadAdminData();
  const nextArticles = [article, ...snapshot.articles];
  saveAdminData({ ...snapshot, articles: nextArticles });
}

export function updateArticle(id: string, article: Article) {
  const snapshot = loadAdminData();
  const nextArticles = snapshot.articles.map((item) => (item.id === id ? article : item));
  saveAdminData({ ...snapshot, articles: nextArticles });
}

export function deleteArticle(id: string) {
  const snapshot = loadAdminData();
  const nextArticles = snapshot.articles.filter((item) => item.id !== id);
  saveAdminData({ ...snapshot, articles: nextArticles });
}
