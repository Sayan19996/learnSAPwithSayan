import Link from "next/link";
import { defaultCategories } from "@/lib/admin-data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Categories</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Manage categories</h2>
        </div>
        <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">+ Add Category</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {defaultCategories.map((category) => (
          <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xl font-bold text-slate-900">{category.name}</div>
            <div className="mt-2 text-sm text-slate-600">{category.description}</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.14em] text-slate-400">/{category.slug}</span>
              <Link href="/admin/categories" className="text-sm font-semibold text-sky-700">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
