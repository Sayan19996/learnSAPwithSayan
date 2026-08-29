type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  wordmark?: string;
};

export default function BrandLogo({
  className = "",
  compact = false,
  wordmark = "learnSAPwithSayan.com",
}: BrandLogoProps) {
  const parts = wordmark.split(/(SAP|with|Sayan|\.com)/gi);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#1b3a34] shadow-[0_12px_30px_rgba(27,58,52,0.28)] ring-1 ring-slate-900/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),transparent_32%),linear-gradient(135deg,#0f766e_0%,#123d36_100%)]" />
        <svg
          viewBox="0 0 64 64"
          className="relative h-8 w-8 drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
          aria-label="Learn SAP with Sayan brand mark"
          role="img"
        >
          <path
            d="M44 15.5H22.5C17.1 15.5 13 19.6 13 24.8c0 4.5 3.2 7.8 7.4 8.6l14.7 3.1c4.6 1 7.3 3.6 7.3 7.7 0 4.9-4.3 8.3-10.8 8.3H16.8v-6.3h22c3.3 0 5.3-1.7 5.3-4.2 0-2.4-1.9-3.9-5.4-4.6l-15.3-3.1C11.5 25.5 8 21.3 8 16.6 8 10.6 12.7 6 20.2 6H44v9.5Z"
            fill="currentColor"
            className="text-white"
          />
          <path d="M13 49.5h38.5v6.5H13z" fill="#f59e0b" />
        </svg>
      </div>

      {!compact ? (
        <div className="min-w-0 leading-none">
          <div className="text-[1.22rem] font-black tracking-[-0.08em] text-slate-900 sm:text-[1.5rem]">
            {parts.map((part, index) => {
              const lower = part.toLowerCase();

              if (lower === "sap") {
                return <span key={`${part}-${index}`} className="text-[#0f766e]">{part}</span>;
              }

              if (lower === "sayan") {
                return <span key={`${part}-${index}`} className="text-[#f59e0b]">{part}</span>;
              }

              if (lower === ".com") {
                return <span key={`${part}-${index}`} className="text-slate-500">{part}</span>;
              }

              return <span key={`${part}-${index}`} className="text-slate-900">{part}</span>;
            })}
          </div>
          <div className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
            tutorials • roadmaps • architecture
          </div>
        </div>
      ) : null}
    </div>
  );
}
