import type { Metadata } from "next";

import { getArticleBySlug, getAllArticles } from "@/lib/content";

export const siteUrl = "https://www.learnsapwithsayan.com";

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

/**
 * Generates a high-impact list of keywords based on the article's context.
 */
function generateKeywords(article: any) {
  const baseKeywords = ["SAP", "tutorial", "enterprise software", "SAP Consulting"];
  const categoryKeywords = {
    "ABAP": ["ABAP Programming", "Modern ABAP", "SAP Backend", "ABAP Cloud"],
    "Fiori": ["SAP Fiori", "SAPUI5", "Frontend Development", "UX Design"],
    "RAP": ["SAP RAP", "RESTful ABAP Programming Model", "OData", "SAP Business Application Studio"],
    "BTP": ["SAP BTP", "Cloud Platform", "SAP Integration", "Cloud Foundry"],
  };

  const specific = categoryKeywords[article.category as keyof typeof categoryKeywords] || [];
  return [...baseKeywords, ...specific, article.title, article.category];
}

export function buildArticleMetadata(slug: string): Metadata | null {
  const article = getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  const title = `${article.title} | Expert SAP Guide`;
  const description = article.description || "Learn practical SAP concepts, implementation patterns, and architecture guidance.";
  const canonical = `${siteUrl}/tutorials/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    authors: [{ name: article.author }],
    keywords: generateKeywords(article),
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Learn SAP with Sayan",
      locale: "en_US",
      images: [
        {
          url: "/og-default.svg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.svg"],
    },
    other: {
      "article:published_time": article.publishedAt,
      "article:modified_time": article.publishedAt,
      "article:author": article.author,
      "article:section": article.category,
    },
  };
}

// ...existing code...
export function buildArticleJsonLd(slug: string) {
  const article = getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  const title = `${article.title} — Complete Guide`;
  const description = stripHtml(article.description || "Learn practical SAP concepts and implementation guidance.");
  const canonical = `${siteUrl}/tutorials/${article.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: {
        "@type": "Person",
        name: article.author,
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Learn SAP with Sayan",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-default.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      image: `${siteUrl}/og-default.svg`,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      articleSection: article.category,
      inLanguage: "en",
      url: canonical,
      keywords: generateKeywords(article).join(", "),
      about: {
        "@type": "Thing",
        name: article.category,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tutorials",
          item: `${siteUrl}/tutorials`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: canonical,
        },
      ],
    },
  ];
}

export function getAllSitemapUrls() {
// ...existing code...
  const articles = getAllArticles();
  
  const paths = [
    { url: `${siteUrl}/`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/tutorials`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/resources`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/genai`, lastModified: new Date().toISOString() },
  ];

  const articlePaths = articles.map(article => ({
    url: `${siteUrl}/tutorials/${article.slug}`,
    lastModified: article.publishedAt,
  }));

  return [...paths, ...articlePaths];
}

  };
}

export function buildBreadcrumbJsonLd(slug: string) {
  const article = getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tutorials",
        item: `${siteUrl}/tutorials`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${siteUrl}/tutorials/${article.slug}`,
      },
    ],
  };
}

export function getAllSitemapUrls() {
  const articles = getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `${siteUrl}/tutorials/${article.slug}`,
    lastModified: article.publishedAt,
  }));

  const staticUrls = [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/tutorials`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/categories`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/roadmap`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/resources`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/privacy`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/terms`, lastModified: new Date().toISOString() },
  ];

  return [...staticUrls, ...articleUrls];
}
