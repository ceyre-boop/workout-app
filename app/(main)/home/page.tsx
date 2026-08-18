import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { PhotoCard } from "@/components/ui/photo-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { getProfile, getTodaysWorkout, getSessions } from "@/lib/data/repo";
import { weekCount } from "@/lib/stats";
import { formatDuration } from "@/lib/utils";

const WEEKLY_TARGET = 6;

export default async function HomePage() {
  const [profile, todays, sessions] = await Promise.all([
    getProfile(),
    getTodaysWorkout(),
    getSessions(),
  ]);
  const completedThisWeek = weekCount(sessions);
  const firstName = profile.displayName.split(" ")[0];

  return (
    <div className="flex flex-col gap-8 px-5 pt-6">
      <h1 className="font-display uppercase tracking-tight text-3xl leading-[0.95]">
        Good Morning,
        <br />
        {firstName}.
      </h1>

      {todays ? (
        <section className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
            Today&apos;s Workout
          </span>
          <PhotoCard
            category={todays.program.category}
            eyebrow={todays.program.title}
            title={todays.workout.title}
            meta={`${formatDuration(todays.workout.estMinutes)} • ${todays.program.title}`}
            variant="hero"
          >
            <div className="mt-3 flex gap-2">
              <Link
                href={`/player/${todays.workout.id}`}
                className="font-body inline-flex h-11 w-fit items-center rounded-app bg-primary px-6 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Start Workout
              </Link>
              <Link
                href={`/workouts/${todays.workout.id}`}
                className="font-body inline-flex h-11 w-fit items-center rounded-app border border-white/40 px-4 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Details
              </Link>
            </div>
          </PhotoCard>
        </section>
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="No Program Yet"
          body="Enroll in a program to see today's workout here."
          ctaLabel="Browse Programs"
          ctaHref="/programs"
        />
      )}

      <section className="flex flex-col gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Weekly Progress
        </span>
        <div className="rounded-app border border-border bg-surface p-4">
          <p className="font-display text-2xl tracking-tight text-text">
            {completedThisWeek} / {WEEKLY_TARGET}{" "}
            <span className="font-body text-sm font-normal uppercase tracking-wide text-text-muted">
              Workouts Completed
            </span>
          </p>
          <ProgressBar
            value={completedThisWeek}
            max={WEEKLY_TARGET}
            label="Weekly workouts completed"
            className="mt-3"
          />
        </div>
      </section>
    </div>
  );
}
