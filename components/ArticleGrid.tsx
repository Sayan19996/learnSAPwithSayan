import ArticleCard, { type ArticleCardProps } from "./ArticleCard";

type ArticleGridProps = {
  articles: ArticleCardProps[];
  columns?: "3" | "2" | "1";
  className?: string;
};

export default function ArticleGrid({
  articles,
  columns = "3",
  className = "",
}: ArticleGridProps) {
  const gridClassName = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  }[columns];

  return (
    <div className={`grid gap-6 ${gridClassName} ${className}`}>
      {articles.map((article) => (
        <ArticleCard key={article.href} {...article} />
      ))}
    </div>
  );
}
