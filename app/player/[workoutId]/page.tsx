import { notFound } from "next/navigation";
import { PlayerShell } from "@/components/player/player-shell";
import {
  getWorkout,
  getWorkoutExercises,
  getExercise,
  getExerciseBySlug,
  getProgramForWorkout,
  getSessions,
} from "@/lib/data/repo";
import { currentStreak } from "@/lib/stats";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { workoutId } = await params;
  const workout = await getWorkout(workoutId);
  if (!workout) notFound();

  const [program, workoutExercises] = await Promise.all([
    getProgramForWorkout(workoutId),
    getWorkoutExercises(workoutId),
  ]);

  const rows = (
    await Promise.all(
      workoutExercises.map(async (we) => {
        const exercise = await getExercise(we.exerciseId);
        if (!exercise) return null;
        const subs = exercise.substitutions
          ? (
              await Promise.all(exercise.substitutions.map((s) => getExerciseBySlug(s)))
            ).filter((e) => !!e)
          : [];
        return { we, exercise, subs };
      }),
    )
  ).filter((r): r is NonNullable<typeof r> => !!r);

  if (rows.length === 0) {
    // ISC-84 guard: never render an empty player.
    notFound();
  }

  const sessions = await getSessions();
  const baselineStreak = currentStreak(sessions);

  return (
    <PlayerShell
      workout={workout}
      category={program?.category}
      rows={rows}
      baselineStreak={baselineStreak}
    />
  );
}
