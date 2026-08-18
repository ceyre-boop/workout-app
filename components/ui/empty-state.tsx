import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "./button-variants";

export function EmptyState({
  icon: Icon,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-app border border-dashed border-border px-6 py-10 text-center">
      <Icon size={28} className="text-text-muted" aria-hidden />
      <h3 className="font-display uppercase tracking-tight text-xl text-text">
        {title}
      </h3>
      <p className="font-body max-w-xs text-sm text-text-muted">{body}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className={buttonVariants({ variant: "primary", size: "sm", className: "mt-1" })}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
