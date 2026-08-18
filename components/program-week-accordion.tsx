"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import type { ProgramWeek, Workout } from "@/lib/types";

export function ProgramWeekAccordion({
  weeks,
  workoutsByWeek,
  defaultOpenWeekId,
}: {
  weeks: ProgramWeek[];
  workoutsByWeek: Record<string, Workout[]>;
  defaultOpenWeekId?: string;
}) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenWeekId ?? weeks[0]?.id);

  return (
    <div className="flex flex-col divide-y divide-border rounded-app border border-border">
      {weeks.map((week) => {
        const open = openId === week.id;
        const workouts = workoutsByWeek[week.id] ?? [];
        return (
          <div key={week.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? undefined : week.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left"
            >
              <span className="font-body text-sm font-semibold text-text">
                Week {week.weekNumber} — {week.title}
              </span>
              <ChevronDown
                size={16}
                className={cn("text-text-muted transition-transform", open && "rotate-180")}
              />
            </button>
            {open && (
              <div className="flex flex-col gap-1 bg-bg px-4 pb-4">
                {workouts.map((w) => (
                  <Link
                    key={w.id}
                    href={`/workouts/${w.id}`}
                    className="font-body flex items-center justify-between rounded-app px-2 py-2.5 text-sm text-text hover:bg-surface"
                  >
                    <span>{w.title}</span>
                    <span className="text-xs text-text-muted">
                      {formatDuration(w.estMinutes)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
