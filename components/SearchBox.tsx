"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type SearchBoxProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
};

export default function SearchBox({
  value = "",
  placeholder = "Search tutorials, topics, or keywords",
  onChange,
  onSubmit,
  className = "",
}: SearchBoxProps) {
  const inputId = useId();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    onChange?.(nextValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextValue = inputValue.trim();

    if (onSubmit) {
      onSubmit(nextValue);
      return;
    }

    if (!nextValue) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(nextValue)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Search tutorials
      </label>
      <input
        id={inputId}
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-white py-3 pl-5 pr-14 text-sm text-slate-900 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
      />
      <button
        type="submit"
        className="absolute inset-y-1 right-1 inline-flex items-center rounded-full bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}
