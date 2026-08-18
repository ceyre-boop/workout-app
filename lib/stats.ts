import { formatWeekday } from "@/lib/utils";

interface DatedEntry {
  completedAt?: string;
  startedAt: string;
}

/** Mon-anchored current streak of consecutive days with a completed session. */
export function currentStreak(sessions: DatedEntry[]): number {
  const days = new Set(
    sessions
      .filter((s) => s.completedAt)
      .map((s) => new Date(s.completedAt!).toDateString()),
  );
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Last-7-day bar chart data, S M T W T F S ending today. */
export function weeklyBarData(sessions: DatedEntry[]) {
  const counts = new Map<string, number>();
  const days: { key: string; label: string }[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toDateString();
    days.push({ key, label: formatWeekday(d) });
    counts.set(key, 0);
  }

  for (const s of sessions) {
    if (!s.completedAt) continue;
    const key = new Date(s.completedAt).toDateString();
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return days.map((d, i) => ({ day: d.label, count: counts.get(d.key) ?? 0, index: i }));
}

export function monthCount(sessions: DatedEntry[]) {
  const now = new Date();
  return sessions.filter((s) => {
    if (!s.completedAt) return false;
    const d = new Date(s.completedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}

/**
 * Same rolling 7-day window as weeklyBarData, summed — deliberately NOT a
 * separate calendar-week (Sun-anchored) calculation. Two different
 * definitions of "this week" on one screen previously produced a visible
 * contradiction (a "0 this week" stat next to a bar chart showing 2 bars
 * for the same week) — caught via live Interceptor-equivalent verification.
 */
export function weekCount(sessions: DatedEntry[]) {
  return weeklyBarData(sessions).reduce((sum, d) => sum + d.count, 0);
}
