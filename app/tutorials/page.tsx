import ArticleFeed from "@/components/ArticleFeed";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import { getAllArticles } from "@/lib/content";

export default function Page() {
  const articles = getAllArticles().map((article) => ({
    title: article.title,
    description: article.description,
    category: article.category,
    readTime: article.readTime,
    date: article.publishedAt,
    href: `/tutorials/${article.slug}`,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl mx-auto">
          <SearchBox />
        </div>

        <ArticleFeed
          eyebrow="Tutorials"
          title="Explore SAP tutorials"
          description="This article list is generated from MDX content files and reused across the site."
          articles={articles}
        />
      </main>
      <Footer />
    </div>
  );
}
