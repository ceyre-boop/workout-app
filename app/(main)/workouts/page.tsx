import Link from "next/link";
import { Dumbbell, ChevronRight } from "lucide-react";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getActiveEnrollment,
  getPrograms,
  getProgramWeeks,
  getWorkoutsForWeek,
  getSessions,
  getWorkout,
} from "@/lib/data/repo";
import { formatDuration } from "@/lib/utils";

export default async function WorkoutsPage() {
  const enrollment = await getActiveEnrollment();
  const programs = await getPrograms();
  const program = enrollment ? programs.find((p) => p.id === enrollment.programId) : undefined;

  let upcoming: Awaited<ReturnType<typeof getWorkoutsForWeek>> = [];
  if (program && enrollment) {
    const weeks = await getProgramWeeks(program.id);
    const week = weeks.find((w) => w.weekNumber === enrollment.currentWeek) ?? weeks[0];
    if (week) upcoming = await getWorkoutsForWeek(week.id);
  }

  const sessions = (await getSessions()).slice(0, 6);
  const recent = (
    await Promise.all(
      sessions.map(async (s) => ({ session: s, workout: await getWorkout(s.workoutId) })),
    )
  ).filter((r) => r.workout);

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <HeadlineRule title="Workouts" />

      <section className="flex flex-col gap-2">
        <h2 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          This Week
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState
            icon={Dumbbell}
            title="No Program Active"
            body="Enroll in a program to see this week's workouts."
            ctaLabel="Browse Programs"
            ctaHref="/programs"
          />
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-app border border-border bg-surface">
            {upcoming.map((w) => (
              <Link
                key={w.id}
                href={`/workouts/${w.id}`}
                className="flex items-center gap-3 px-4 py-3.5"
              >
                <div className="flex flex-1 flex-col">
                  <span className="font-body text-sm font-medium text-text">{w.title}</span>
                  <span className="font-body text-xs uppercase tracking-wide text-text-muted">
                    {formatDuration(w.estMinutes)}
                  </span>
                </div>
                <ChevronRight size={16} className="text-text-muted" aria-hidden />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Recent
        </h2>
        {recent.length === 0 ? (
          <p className="font-body text-sm text-text-muted">Nothing logged yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-app border border-border bg-surface">
            {recent.map(({ session, workout }) => (
              <Link
                key={session.id}
                href={`/workouts/${workout!.id}`}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="font-body text-sm text-text">{workout!.title}</span>
                <span className="font-body text-xs capitalize text-text-muted">
                  {session.status.replace("_", " ")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
