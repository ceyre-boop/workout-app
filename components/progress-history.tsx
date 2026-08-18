"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { Session, Workout } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

export function ProgressHistory({
  sessions,
  workoutsById,
}: {
  sessions: Session[];
  workoutsById: Record<string, Workout>;
}) {
  if (sessions.length === 0) {
    return (
      <p className="font-body py-8 text-center text-sm text-text-muted">
        No sessions logged yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {sessions.map((s) => {
        const workout = workoutsById[s.workoutId];
        const date = new Date(s.startedAt);
        return (
          <li key={s.id} className="flex items-center gap-3 py-3">
            {s.status === "completed" ? (
              <CheckCircle2 size={20} className="shrink-0 text-success" aria-hidden />
            ) : s.status === "abandoned" ? (
              <XCircle size={20} className="shrink-0 text-text-muted" aria-hidden />
            ) : (
              <Clock size={20} className="shrink-0 text-primary" aria-hidden />
            )}
            <div className="flex flex-1 flex-col">
              <span className="font-body text-sm font-medium text-text">
                {workout?.title ?? "Workout"}
              </span>
              <span className="font-body text-xs text-text-muted">
                {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                {s.durationSeconds ? ` • ${formatDuration(Math.round(s.durationSeconds / 60))}` : ""}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
