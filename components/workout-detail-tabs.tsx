"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import type { Exercise, Workout, WorkoutExercise } from "@/lib/types";

export function WorkoutDetailTabs({
  workout,
  exerciseRows,
}: {
  workout: Workout;
  exerciseRows: { we: WorkoutExercise; exercise: Exercise }[];
}) {
  const [tab, setTab] = useState<"overview" | "exercises">("overview");

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { label: "Overview", value: "overview" },
          { label: "Exercises", value: "exercises" },
        ]}
      />

      {tab === "overview" ? (
        <p className="font-body text-sm text-text-muted">{workout.description}</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {exerciseRows.map(({ we, exercise }) => (
            <Link
              key={we.id}
              href={`/exercises/${exercise.slug}`}
              className="flex items-center gap-3 py-3"
            >
              <div className="h-12 w-12 shrink-0 rounded-app bg-primary/10" aria-hidden />
              <div className="flex flex-1 flex-col">
                <span className="font-body text-sm font-medium text-text">
                  {exercise.name}
                  {we.supersetGroup && (
                    <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                      Superset
                    </span>
                  )}
                </span>
                <span className="font-body text-xs uppercase tracking-wide text-text-muted">
                  {we.sets} Sets • {we.repsPrescribed} Reps
                </span>
              </div>
              <ChevronRight size={16} className="text-text-muted" aria-hidden />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
