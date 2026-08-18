import {
  Dumbbell,
  Footprints,
  Flame,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/**
 * No real photography exists yet (brief §10.2 — needs a real shoot; the
 * fallback AI-image path also isn't available this session, see ISA
 * Decisions). Rather than a broken <Image> or fabricated stock photography,
 * every "photo" slot renders a deterministic branded gradient + icon keyed
 * on category — reads as an intentional placeholder, not an error.
 */
const PLACEHOLDER_BY_CATEGORY: Record<
  string,
  { icon: LucideIcon; gradient: string }
> = {
  strength: {
    icon: Dumbbell,
    gradient: "linear-gradient(155deg, #3a1017 0%, #6b1f2b 55%, #2a0d12 100%)",
  },
  running: {
    icon: Footprints,
    gradient: "linear-gradient(155deg, #241a14 0%, #6b1f2b 55%, #14100d 100%)",
  },
  hybrid: {
    icon: Flame,
    gradient: "linear-gradient(155deg, #2a1014 0%, #831f31 55%, #1a0a0d 100%)",
  },
  "race-prep": {
    icon: Trophy,
    gradient: "linear-gradient(155deg, #1c0e12 0%, #6b1f2b 45%, #0f0708 100%)",
  },
};

const FALLBACK = PLACEHOLDER_BY_CATEGORY.strength;

export function PhotoPlaceholder({
  category,
  className,
}: {
  category?: string;
  className?: string;
}) {
  const { icon: Icon, gradient } =
    (category && PLACEHOLDER_BY_CATEGORY[category]) || FALLBACK;

  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundImage: gradient,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={56} strokeWidth={1.25} className="text-white/25" />
    </div>
  );
}
