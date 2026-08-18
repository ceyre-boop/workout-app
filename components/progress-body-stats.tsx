"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { BodyStats } from "@/lib/types";

export function ProgressBodyStats({ entries }: { entries: BodyStats[] }) {
  if (entries.length === 0) {
    return (
      <p className="font-body py-8 text-center text-sm text-text-muted">
        No body stats logged yet.
      </p>
    );
  }

  const chartData = entries.map((e) => ({
    date: new Date(e.recordedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    weight: e.weight,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-app border border-border bg-surface p-4">
        <h3 className="font-body mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Weight Over Time
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis hide domain={["dataMin - 3", "dataMax + 3"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex flex-col divide-y divide-border rounded-app border border-border">
        {[...entries].reverse().map((e) => (
          <li key={e.id} className="font-body flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-text-muted">
              {new Date(e.recordedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="font-semibold text-text">{e.weight} lb</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
