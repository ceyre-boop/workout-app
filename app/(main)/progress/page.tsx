import { HeadlineRule } from "@/components/ui/headline-rule";
import { ProgressTabs } from "@/components/progress-tabs";
import { getSessions, getWorkout, getBodyStats, getProgramForWorkout } from "@/lib/data/repo";
import type { Workout } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  strength: "Strength",
  running: "Running",
  hybrid: "Hybrid",
  "race-prep": "Race Prep",
};

export default async function ProgressPage() {
  const [sessions, bodyStats] = await Promise.all([getSessions(), getBodyStats()]);

  const workoutsById: Record<string, Workout> = {};
  const categoryCounts: Record<string, number> = {};

  await Promise.all(
    sessions.map(async (s) => {
      const workout = await getWorkout(s.workoutId);
      if (workout) workoutsById[workout.id] = workout;
      const program = await getProgramForWorkout(s.workoutId);
      if (program && s.status === "completed") {
        categoryCounts[program.category] = (categoryCounts[program.category] ?? 0) + 1;
      }
    }),
  );

  const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
  const focusBreakdown = Object.entries(categoryCounts).map(([category, count]) => ({
    name: CATEGORY_LABELS[category] ?? category,
    value: Math.round((count / total) * 100),
  }));

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <HeadlineRule title="Progress" />
      <ProgressTabs
        sessions={sessions}
        workoutsById={workoutsById}
        bodyStats={bodyStats}
        focusBreakdown={focusBreakdown.length ? focusBreakdown : [{ name: "No Data", value: 100 }]}
      />
    </div>
  );
}
