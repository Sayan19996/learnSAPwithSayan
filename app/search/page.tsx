import ArticleFeed from "@/components/ArticleFeed";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import { searchArticles } from "@/lib/content";

export default function Page({
  searchParams,
}: {
  searchParams?: { q?: string | string[] };
}) {
  const rawQuery = searchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery.join(" ") : rawQuery ?? "";
  const results = searchArticles(query);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl">
          <SearchBox value={query} />
        </div>

        <ArticleFeed
          eyebrow="Search results"
          title={query ? `Results for “${query}”` : "Popular searches"}
          description={
            query
              ? "Relevant SAP articles ranked by title, category, and topic match."
              : "Start with a targeted topic such as RAP authorization, ABAP, or CDS."
          }
          articles={results}
        />
      </main>
      <Footer />
    </div>
  );
}
