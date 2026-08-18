import Link from "next/link";
import { X } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Button } from "@/components/ui/button";
import type { Exercise, Workout, WorkoutExercise } from "@/lib/types";

/**
 * "Review before starting" pre-screen (IterativeDepth finding — don't drop
 * users cold into set 1).
 */
export function PlayerReview({
  workout,
  category,
  rows,
  onStart,
}: {
  workout: Workout;
  category?: string;
  rows: { we: WorkoutExercise; exercise: Exercise }[];
  onStart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
        <PhotoPlaceholder category={category} />
        <div className="absolute inset-0 scrim" />
        <Link
          href="/home"
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white"
        >
          <X size={18} />
        </Link>
        <h1 className="absolute inset-x-0 bottom-0 p-5 font-display uppercase leading-[0.95] tracking-tight text-3xl text-white">
          {workout.title}
        </h1>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          {rows.length} Exercises
        </p>
        {rows.map(({ we, exercise }, i) => (
          <div key={we.id} className="flex items-center gap-3">
            <span className="font-display w-6 text-center text-text-muted">{i + 1}</span>
            <div className="flex-1">
              <p className="font-body text-sm font-medium text-text">{exercise.name}</p>
              <p className="font-body text-xs uppercase tracking-wide text-text-muted">
                {we.sets} Sets • {we.repsPrescribed} Reps
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="safe-bottom border-t border-border px-5 py-4">
        <Button size="lg" className="w-full" onClick={onStart}>
          Start Workout
        </Button>
      </div>
    </div>
  );
}
