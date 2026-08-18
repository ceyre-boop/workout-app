import Link from "next/link";
import { cn } from "@/lib/utils";
import { PhotoPlaceholder } from "./photo-placeholder";

/**
 * The single full-bleed-photo primitive used everywhere the brand's
 * "the photo IS the card" motif appears (ISA Decisions, ApertureOscillation
 * synthesis): Home's Today's Workout, Programs list, Program/Workout Detail
 * heroes. One component, three variants — pixel-fidelity and structural
 * coherence are the same decision, not a tradeoff.
 *
 * No real photography exists yet (see ISA Decisions) — every card renders a
 * branded gradient placeholder keyed on `category` rather than a broken or
 * fabricated <Image>.
 */
export function PhotoCard({
  href,
  category,
  eyebrow,
  title,
  meta,
  variant = "card",
  className,
  children,
}: {
  href?: string;
  category?: string;
  eyebrow?: string;
  title: string;
  meta?: string;
  variant?: "card" | "hero" | "row";
  className?: string;
  children?: React.ReactNode;
}) {
  const heightClass =
    variant === "hero" ? "aspect-[4/5]" : variant === "row" ? "aspect-[16/9]" : "aspect-[3/4]";

  const content = (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-app bg-surface",
        heightClass,
        className,
      )}
    >
      <PhotoPlaceholder category={category} />
      <div className="absolute inset-0 scrim" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        {eyebrow && (
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80">
            {eyebrow}
          </span>
        )}
        <h3 className="font-display uppercase leading-[0.95] tracking-tight text-white text-2xl">
          {title}
        </h3>
        {meta && (
          <span className="font-body text-xs uppercase tracking-wide text-white/75">
            {meta}
          </span>
        )}
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none">
        {content}
      </Link>
    );
  }
  return content;
}
