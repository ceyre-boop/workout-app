import { notFound } from "next/navigation";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { CategoryBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProgramWeekAccordion } from "@/components/program-week-accordion";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  getProgramBySlug,
  getProgramWeeks,
  getWorkoutsForWeek,
  getEnrollmentForProgram,
  getFirstWorkoutOfProgram,
} from "@/lib/data/repo";
import type { Workout } from "@/lib/types";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const weeks = await getProgramWeeks(program.id);
  const workoutsByWeek: Record<string, Workout[]> = {};
  await Promise.all(
    weeks.map(async (w) => {
      workoutsByWeek[w.id] = await getWorkoutsForWeek(w.id);
    }),
  );
  const enrollment = await getEnrollmentForProgram(program.id);
  const firstWorkout = await getFirstWorkoutOfProgram(program.id);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PhotoPlaceholder category={program.category} />
        <div className="absolute inset-0 scrim" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
          <CategoryBadge category={program.category} />
          <h1 className="font-display uppercase leading-[0.95] tracking-tight text-4xl text-white">
            {program.title}
          </h1>
          <span className="font-body text-xs uppercase tracking-wide text-white/80">
            {program.durationWeeks} Weeks
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5">
        <p className="font-body text-sm text-text-muted">{program.description}</p>

        {enrollment ? (
          <div className="rounded-app border border-border bg-surface p-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-text-muted">
              Week {enrollment.currentWeek} of {program.durationWeeks}
            </p>
            <ProgressBar
              value={enrollment.currentWeek}
              max={program.durationWeeks}
              className="mt-2"
              label="Program progress"
            />
          </div>
        ) : firstWorkout ? (
          <Link href={`/player/${firstWorkout.id}`} className={buttonVariants({ size: "lg" })}>
            Start Program
          </Link>
        ) : null}

        <ProgramWeekAccordion
          weeks={weeks}
          workoutsByWeek={workoutsByWeek}
          defaultOpenWeekId={weeks.find((w) => w.weekNumber === enrollment?.currentWeek)?.id}
        />
      </div>
    </div>
  );
}
