import CategoryCard, { type CategoryCardProps } from "./CategoryCard";
import SectionHeader from "./SectionHeader";

type CategoryFeedProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  categories: CategoryCardProps[];
  align?: "left" | "center";
  className?: string;
};

export default function CategoryFeed({
  eyebrow,
  title,
  description,
  categories,
  align = "left",
  className = "",
}: CategoryFeedProps) {
  return (
    <section className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} align={align} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.href} {...category} />
        ))}
      </div>
    </section>
  );
}
