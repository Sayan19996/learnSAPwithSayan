import type { MetadataRoute } from "next";

import { getAllSitemapUrls } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapUrls().map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: "weekly",
    priority: entry.url.includes("/tutorials/") ? 0.8 : 0.7,
  }));
}
