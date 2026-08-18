import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { formatDuration } from "@/lib/utils";

export function PlayerComplete({
  workoutTitle,
  durationSeconds,
  setsCompleted,
  streak,
}: {
  workoutTitle: string;
  durationSeconds: number;
  setsCompleted: number;
  streak: number;
}) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, transparent 0%, rgba(107,31,43,0.08) 100%)",
      }}
    >
      <span className="font-script text-5xl text-primary">Well done.</span>
      <div>
        <h1 className="font-display uppercase tracking-tight text-3xl">{workoutTitle}</h1>
        <p className="font-body mt-1 text-sm text-text-muted">Session complete</p>
      </div>

      <div className="grid w-full max-w-xs grid-cols-3 gap-3">
        <div className="rounded-app border border-border bg-surface p-3">
          <p className="font-display text-2xl leading-none">
            {formatDuration(Math.max(1, Math.round(durationSeconds / 60)))}
          </p>
          <p className="font-body mt-1 text-[10px] uppercase tracking-wide text-text-muted">
            Duration
          </p>
        </div>
        <div className="rounded-app border border-border bg-surface p-3">
          <p className="font-display text-2xl leading-none">{setsCompleted}</p>
          <p className="font-body mt-1 text-[10px] uppercase tracking-wide text-text-muted">
            Sets Logged
          </p>
        </div>
        <div className="rounded-app border border-border bg-surface p-3">
          <p className="font-display text-2xl leading-none">{streak}</p>
          <p className="font-body mt-1 text-[10px] uppercase tracking-wide text-text-muted">
            Day Streak
          </p>
        </div>
      </div>

      <Link href="/home" className={buttonVariants({ size: "lg", className: "mt-2 w-full max-w-xs" })}>
        Back to Home
      </Link>
    </div>
  );
}
