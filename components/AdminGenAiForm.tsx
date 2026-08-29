"use client";

import React, { useState } from "react";

export default function AdminGenAiForm({ initial }: { initial?: any }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [status, setStatus] = useState(initial?.status ?? "published");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { name, slug, description, url, icon, status };
    const method = initial?.id ? "PUT" : "POST";
    const endpoint = initial?.id ? `/api/admin/genai/${initial.id}` : `/api/admin/genai`;
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      alert("Saved");
      if (!initial?.id) {
        setName("");
        setSlug("");
        setDescription("");
        setUrl("");
        setIcon("");
        setStatus("published");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input className="mt-1 block w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input className="mt-1 block w-full" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">URL</label>
        <input className="mt-1 block w-full" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Icon URL</label>
        <input className="mt-1 block w-full" value={icon} onChange={(e) => setIcon(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea className="mt-1 block w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select className="mt-1 block" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
