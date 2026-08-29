"use client";

import { type FormEvent, useState } from "react";

type NewsletterProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
  onSubmit?: (email: string) => void;
};

export default function Newsletter({
  title = "Get the latest SAP insights",
  description = "Join the newsletter for new tutorials, practical guides, and curated learning paths.",
  buttonLabel = "Subscribe",
  placeholder = "Enter your email",
  className = "",
  onSubmit,
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(email);
    setEmail("");
  };

  return (
    <section id="newsletter" className={`rounded-3xl bg-slate-900 px-6 py-10 text-white ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Newsletter</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-4 text-slate-300">{description}</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            className="w-full rounded-full border border-slate-700 bg-slate-800 px-5 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-500/20 sm:max-w-md"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
