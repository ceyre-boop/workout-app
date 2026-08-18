"use client";

import { cn } from "@/lib/utils";

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn("flex items-center gap-6 border-b border-border", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "font-body relative -mb-px py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
              active ? "text-text" : "text-text-muted hover:text-text",
            )}
          >
            {opt.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
