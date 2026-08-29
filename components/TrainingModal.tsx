"use client";

import { useState } from "react";

export default function TrainingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [training, setTraining] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, training, message }),
      });
      if (res.ok) {
        setSuccess("Application submitted. We'll contact you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setTraining("");
        setMessage("");
      } else {
        const data = await res.json();
        setSuccess(data?.error || "Submission failed");
      }
    } catch (err) {
      setSuccess("Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Training Application</h3>
          <button onClick={onClose} className="text-sm">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input className="w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium">Contact Number</label>
            <input className="w-full rounded border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium">Training Needed</label>
            <input className="w-full rounded border px-3 py-2" value={training} onChange={(e) => setTraining(e.target.value)} placeholder="e.g., RAP, ABAP, Fiori" required />
          </div>

          <div>
            <label className="block text-sm font-medium">Message (optional)</label>
            <textarea className="w-full rounded border px-3 py-2" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button type="submit" disabled={loading} className="rounded bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
            {success ? <div className="text-sm text-slate-600">{success}</div> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
