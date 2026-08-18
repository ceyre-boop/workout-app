import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** No real demo footage exists yet — see lib/data/playback.ts. */
export function VideoPlaceholder({
  label = "Demo video",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-app",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(155deg, #2a1014 0%, #6b1f2b 55%, #1a0a0d 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <PlayCircle size={40} strokeWidth={1.25} className="text-white/70" />
        <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-white/60">
          {label} — footage pending
        </span>
      </div>
    </div>
  );
}
