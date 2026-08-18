import { cn } from "@/lib/utils";

/**
 * The maroon underline motif from the reference boards. Reused wherever a
 * screen title needs the brand's signature rule — never re-implemented
 * per-screen (ISC-15).
 */
export function HeadlineRule({
  title,
  eyebrow,
  className,
  as: Tag = "h1",
}: {
  title: string;
  eyebrow?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {eyebrow && (
        <span className="font-body text-xs uppercase tracking-[0.15em] text-text-muted">
          {eyebrow}
        </span>
      )}
      <Tag className="font-display uppercase tracking-tight text-3xl leading-[0.95] text-text">
        {title}
      </Tag>
      <span
        aria-hidden
        className="h-[3px] w-12 rounded-full bg-primary"
      />
    </div>
  );
}
