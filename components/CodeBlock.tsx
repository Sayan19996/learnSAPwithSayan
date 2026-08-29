"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  children?: ReactNode;
  className?: string;
};

const normalizeCode = (children: ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => normalizeCode(child)).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return normalizeCode((children as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
};

const getLanguage = (className?: string) => {
  const match = className?.match(/language-([a-z0-9_-]+)/i);
  return match ? match[1].toLowerCase() : "abap";
};

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = normalizeCode(children).trim();
  const language = getLanguage(className);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-[0_16px_28px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-200 transition hover:border-sky-400 hover:text-sky-200"
        >
          {copied ? "[ Copied ]" : "[ Copy ]"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem 1rem 1.1rem",
          background: "transparent",
          fontSize: "0.82rem",
          lineHeight: "1.7",
          fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
        }}
        wrapLongLines
        codeTagProps={{
          style: {
            whiteSpace: "pre-wrap",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
