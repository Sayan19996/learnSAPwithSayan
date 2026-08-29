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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Training Application</h3>
              <p className="mt-1 text-sky-100 text-sm">Elevate your SAP skills with professional guidance.</p>
            </div>
            <button 
              onClick={onClose} 
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
              <input 
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
              <input 
                type="email" 
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com"
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Number</label>
              <input 
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+1 234 567 890"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Training Needed</label>
              <input 
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none" 
                value={training} 
                onChange={(e) => setTraining(e.target.value)} 
                placeholder="e.g., RAP, ABAP, Fiori" 
                required 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message (optional)</label>
            <textarea 
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 outline-none min-h-[100px]" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Tell us more about your goals..."
            />
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {success && (
              <div className={`p-3 rounded-lg text-sm text-center font-medium ${success.includes("failed") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                {success}
              </div>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.918l3-2.627z" />
                    </svg>
                    Sending...
                  </span>
                ) : "Submit Application"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
