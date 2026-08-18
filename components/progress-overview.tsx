"use client";

import { Flame } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { StatCard } from "@/components/ui/stat-card";
import type { Session } from "@/lib/types";
import { currentStreak, weeklyBarData, monthCount, weekCount } from "@/lib/stats";

const FOCUS_COLORS = ["var(--primary)", "var(--primary-soft)", "var(--text-muted)", "var(--border)"];

export function ProgressOverview({
  sessions,
  focusBreakdown,
}: {
  sessions: Session[];
  focusBreakdown: { name: string; value: number }[];
}) {
  const streak = currentStreak(sessions);
  const bars = weeklyBarData(sessions);

  return (
    <div className="flex flex-col gap-6">
      <StatCard
        value={monthCount(sessions)}
        label="Workouts Completed This Month"
        chip={`${weekCount(sessions)} This Week`}
      />

      <div className="rounded-app border border-border bg-surface p-4">
        <h3 className="font-body mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          This Week
        </h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={bars} barCategoryGap={12}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            />
            <Bar dataKey="count" radius={[3, 3, 0, 0]} fill="var(--primary)" maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-app border border-border bg-surface p-4">
        <h3 className="font-body mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Training Focus
        </h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie
                data={focusBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={32}
                outerRadius={54}
                paddingAngle={2}
                stroke="none"
              >
                {focusBreakdown.map((entry, i) => (
                  <Cell key={entry.name} fill={FOCUS_COLORS[i % FOCUS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className="flex flex-1 flex-col gap-1.5">
            {focusBreakdown.map((f, i) => (
              <li key={f.name} className="font-body flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: FOCUS_COLORS[i % FOCUS_COLORS.length] }}
                  aria-hidden
                />
                <span className="flex-1 text-text">{f.name}</span>
                <span className="text-text-muted">{f.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-app border border-border bg-surface p-4">
        <Flame size={28} className="text-primary" aria-hidden />
        <div>
          <p className="font-display text-2xl leading-none tracking-tight text-text">
            {streak} {streak === 1 ? "Day" : "Days"}
          </p>
          <p className="font-body text-xs uppercase tracking-wide text-text-muted">
            Current Streak
          </p>
        </div>
      </div>
    </div>
  );
}
