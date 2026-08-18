import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  strength: "Strength",
  running: "Running",
  hybrid: "Hybrid",
  "race-prep": "Race Prep",
};

export function Badge({
  children,
  variant = "muted",
  className,
}: {
  children: React.ReactNode;
  variant?: "muted" | "primary";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-body inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-border/70 text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <Badge className={className}>
      {CATEGORY_LABELS[category] ?? category}
    </Badge>
  );
}
