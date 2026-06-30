"use client";

const TICKER_ITEMS = [
  "743 students supported to date",
  "94% career placement rate for 2025 graduates",
  "New cohort applications open — Siem Reap Province",
  "Porridge for Hope: 500+ meals served monthly",
  "Class of 2025: 489 university graduates",
  "$42/month provides safe dormitory housing",
];

export function ImpactTicker() {
  // Double the items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="w-full h-10 bg-surface-container border-b border-outline-variant/30 overflow-hidden flex items-center group"
      role="marquee"
      aria-label="Live impact statistics ticker"
    >
      <div
        className="flex items-center whitespace-nowrap animate-[ticker_40s_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          willChange: "transform",
        }}
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant px-6">
              {text}
            </span>
            <span className="text-on-surface-variant/30 text-xs">◆</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
