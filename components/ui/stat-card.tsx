import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  value,
  label,
  chip,
  icon: Icon,
  className,
}: {
  value: string | number;
  label: string;
  chip?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-app border border-border bg-surface p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {Icon && <Icon size={18} className="text-primary" aria-hidden />}
        {chip && (
          <span className="font-body rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {chip}
          </span>
        )}
      </div>
      <span className="font-display text-4xl leading-none tracking-tight text-text">
        {value}
      </span>
      <span className="font-body text-xs uppercase tracking-wide text-text-muted">
        {label}
      </span>
    </div>
  );
}
