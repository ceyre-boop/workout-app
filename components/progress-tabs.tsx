"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { ProgressOverview } from "@/components/progress-overview";
import { ProgressHistory } from "@/components/progress-history";
import { ProgressBodyStats } from "@/components/progress-body-stats";
import type { Session, Workout, BodyStats } from "@/lib/types";

export function ProgressTabs({
  sessions,
  workoutsById,
  bodyStats,
  focusBreakdown,
}: {
  sessions: Session[];
  workoutsById: Record<string, Workout>;
  bodyStats: BodyStats[];
  focusBreakdown: { name: string; value: number }[];
}) {
  const [tab, setTab] = useState<"overview" | "workouts" | "body">("overview");

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { label: "Overview", value: "overview" },
          { label: "Workouts", value: "workouts" },
          { label: "Body Stats", value: "body" },
        ]}
      />
      {tab === "overview" && (
        <ProgressOverview sessions={sessions} focusBreakdown={focusBreakdown} />
      )}
      {tab === "workouts" && (
        <ProgressHistory sessions={sessions} workoutsById={workoutsById} />
      )}
      {tab === "body" && <ProgressBodyStats entries={bodyStats} />}
    </div>
  );
}
