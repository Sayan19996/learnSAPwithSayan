import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import CodeBlock from "@/components/CodeBlock";

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const createHeading = (Tag: ElementType) => {
  return ({ children, ...props }: ComponentPropsWithoutRef<typeof Tag>) => {
    const text = typeof children === "string" ? children : String(children ?? "");
    const id = slugify(text);

    return (
      <Tag id={id} {...props} className="mt-8 scroll-mt-24 text-slate-900">
        {children}
      </Tag>
    );
  };
};

const ArchitectureDiagram = ({
  steps = ["Fiori", "OData V4", "RAP", "CDS", "HANA"],
}: {
  steps?: string[];
}) => (
  <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
    <div className="flex flex-col items-center gap-3">
      {steps.map((step, index) => (
        <div key={step} className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="rounded-2xl border border-sky-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm">
              {step}
            </div>
          </div>
          {index < steps.length - 1 ? (
            <div className="flex h-7 items-center justify-center text-slate-400">↓</div>
          ) : null}
        </div>
      ))}
    </div>
  </div>
);

export const mdxComponents = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mt-5 text-base leading-8 text-slate-700" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mt-5 list-disc space-y-2 pl-6 text-slate-700" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mt-5 list-decimal space-y-2 pl-6 text-slate-700" />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="leading-7" />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} className="font-medium text-sky-700 underline decoration-sky-200 underline-offset-4 hover:text-sky-800" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-6 border-l-4 border-sky-500 bg-sky-50 px-4 py-3 text-slate-700"
    />
  ),
  ArchitectureDiagram,
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const { className, children, ...rest } = props;

    return className ? (
      <code {...rest} className={`${className} rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-900`}>
        {children}
      </code>
    ) : (
      <code {...rest} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-900">
        {children}
      </code>
    );
  },
  pre: ({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr {...props} className="my-8 border-slate-200" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="min-w-full border-collapse border border-slate-200 text-left" />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th {...props} className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-slate-900" />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="border border-slate-200 px-4 py-2 text-slate-700" />
  ),
  Note: ({ children, type = "info" }: { children: ReactNode; type?: "info" | "warning" }) => (
    <div
      className={`mt-6 rounded-2xl border p-4 ${
        type === "warning"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-sky-200 bg-sky-50 text-sky-900"
      }`}
    >
      <div className="text-sm font-semibold uppercase tracking-[0.08em]">
        {type === "warning" ? "Warning" : "Note"}
      </div>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  ),
};
