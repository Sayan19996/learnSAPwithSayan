import ArticleGrid from "./ArticleGrid";
import SectionHeader from "./SectionHeader";
import type { ArticleCardProps } from "./ArticleCard";

type ArticleFeedProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  articles: ArticleCardProps[];
  columns?: "1" | "2" | "3";
  align?: "left" | "center";
  className?: string;
};

export default function ArticleFeed({
  eyebrow,
  title,
  description,
  articles,
  columns = "3",
  align = "left",
  className = "",
}: ArticleFeedProps) {
  return (
    <section className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} align={align} />
      <div className="mt-8">
        <ArticleGrid articles={articles} columns={columns} />
      </div>
    </section>
  );
}
