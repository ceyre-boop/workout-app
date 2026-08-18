import { notFound } from "next/navigation";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { WorkoutDetailTabs } from "@/components/workout-detail-tabs";
import { buttonVariants } from "@/components/ui/button-variants";
import { formatDuration } from "@/lib/utils";
import {
  getWorkout,
  getWorkoutExercises,
  getExercise,
  getProgramForWorkout,
} from "@/lib/data/repo";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const [program, workoutExercises] = await Promise.all([
    getProgramForWorkout(id),
    getWorkoutExercises(id),
  ]);

  const exerciseRows = (
    await Promise.all(
      workoutExercises.map(async (we) => {
        const exercise = await getExercise(we.exerciseId);
        return exercise ? { we, exercise } : null;
      }),
    )
  ).filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PhotoPlaceholder category={program?.category} />
        <div className="absolute inset-0 scrim" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
          <h1 className="font-display uppercase leading-[0.95] tracking-tight text-4xl text-white">
            {workout.title}
          </h1>
          <span className="font-body text-xs uppercase tracking-wide text-white/80">
            {formatDuration(workout.estMinutes)} • {exerciseRows.length} Exercises
          </span>
          <Link
            href={`/player/${workout.id}`}
            className={buttonVariants({ className: "mt-3 w-fit" })}
          >
            Start Workout
          </Link>
        </div>
      </div>

      <div className="px-5">
        <WorkoutDetailTabs workout={workout} exerciseRows={exerciseRows} />
      </div>
    </div>
  );
}
