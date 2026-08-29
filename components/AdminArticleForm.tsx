"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  difficulty: string;
  readTime: string;
  status: string;
  featuredImage: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
};

const defaultArticle: FormValues = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  category: "RAP",
  difficulty: "Intermediate",
  readTime: "10 min",
  status: "draft",
  featuredImage: "/og-default.svg",
  content: "# New Article\n\nStart writing your SAP tutorial here.",
  seoTitle: "",
  seoDescription: "",
};

type AdminArticleFormProps = {
  mode?: "create" | "edit";
  initialValues?: Partial<FormValues>;
};

export default function AdminArticleForm({ mode = "create", initialValues }: AdminArticleFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormValues>({ ...defaultArticle, ...initialValues });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({ ...defaultArticle, ...initialValues });
    }
  }, [initialValues]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitArticle = async (statusOverride?: string) => {
    setIsSaving(true);
    setStatusMessage("");

    const nextStatus = statusOverride ?? form.status ?? "draft";
    const payload = {
      ...form,
      status: nextStatus,
      slug: form.slug || form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-article",
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt,
      category: form.category || "RAP",
    };

    const response = await fetch(mode === "edit" ? `/api/admin/articles/${form.id}` : "/api/admin/articles", {
      method: mode === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setIsSaving(false);

    if (!response.ok) {
      const result = await response.json().catch(() => ({ error: "Unable to save article." }));
      setStatusMessage(result.error ?? "Unable to save article.");
      return;
    }

    setStatusMessage(mode === "edit" ? "Article updated successfully." : "Article saved successfully.");
    router.push("/admin/articles");
    router.refresh();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitArticle(form.status || "draft");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
            placeholder="SAP RAP Managed Scenario"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Slug
          <input
            value={form.slug}
            onChange={(event) => handleChange("slug", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
            placeholder="sap-rap-managed-scenario"
          />
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <label className="block text-sm font-medium text-slate-700">
          Category
          <select
            value={form.category}
            onChange={(event) => handleChange("category", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          >
            <option>RAP</option>
            <option>ABAP</option>
            <option>CDS</option>
            <option>Fiori</option>
            <option>BTP</option>
            <option>Integration</option>
            <option>Architecture</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Difficulty
          <select
            value={form.difficulty}
            onChange={(event) => handleChange("difficulty", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Reading Time
          <input
            value={form.readTime}
            onChange={(event) => handleChange("readTime", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
            placeholder="10 min"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Excerpt
        <textarea
          value={form.excerpt}
          onChange={(event) => handleChange("excerpt", event.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          placeholder="Short summary of the tutorial"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Featured Image
        <input
          value={form.featuredImage}
          onChange={(event) => handleChange("featuredImage", event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          placeholder="/images/rap-cover.png"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Content
        <textarea
          value={form.content}
          onChange={(event) => handleChange("content", event.target.value)}
          rows={18}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-800 outline-none transition focus:border-sky-500"
          placeholder="# SAP RAP Managed Scenario"
        />
      </label>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          SEO Title
          <input
            value={form.seoTitle}
            onChange={(event) => handleChange("seoTitle", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Meta Description
          <input
            value={form.seoDescription}
            onChange={(event) => handleChange("seoDescription", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : mode === "edit" ? "Save Changes" : "Save Draft"}
        </button>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => void submitArticle("published")}
          className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60"
        >
          Publish
        </button>
      </div>

      {statusMessage ? <p className="text-sm font-medium text-emerald-700">{statusMessage}</p> : null}
    </form>
  );
}
