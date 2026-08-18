"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, RefreshCw, SkipForward } from "lucide-react";
import { useWakeLock } from "@/lib/hooks/use-wake-lock";
import { uuid } from "@/lib/utils";
import {
  saveSetLogLocally,
  getLocalSetLogsForSession,
  clearLocalSetLogsForSession,
} from "@/lib/data/offline-store";
import {
  getActiveSessionId,
  setActiveSessionId,
  clearActiveSessionId,
} from "@/lib/data/session-pointer";
import { PlayerReview } from "./player-review";
import { PlayerComplete } from "./player-complete";
import { RestTimer } from "./rest-timer";
import { SetRow, type SetRowValue } from "./set-row";
import { VideoPlaceholder } from "@/components/ui/video-placeholder";
import type { Exercise, Workout, WorkoutExercise } from "@/lib/types";

type Row = { we: WorkoutExercise; exercise: Exercise; subs: Exercise[] };
type Step = Row[]; // 1 item normally, 2 items when superset-paired

function groupIntoSteps(rows: Row[]): Step[] {
  const steps: Step[] = [];
  let i = 0;
  while (i < rows.length) {
    const current = rows[i];
    if (current.we.supersetGroup && rows[i + 1]?.we.supersetGroup === current.we.supersetGroup) {
      steps.push([current, rows[i + 1]]);
      i += 2;
    } else {
      steps.push([current]);
      i += 1;
    }
  }
  return steps;
}

function initialSets(sets: number): SetRowValue[] {
  return Array.from({ length: sets }, (_, i) => ({
    setIndex: i + 1,
    weight: "",
    reps: "",
    completed: false,
    skipped: false,
  }));
}

export function PlayerShell({
  workout,
  category,
  rows,
  baselineStreak,
}: {
  workout: Workout;
  category?: string;
  rows: Row[];
  baselineStreak: number;
}) {
  useWakeLock();
  const router = useRouter();

  const steps = useMemo(() => groupIntoSteps(rows), [rows]);
  // Resolved in an effect below (see ISA Decisions: reload previously
  // orphaned logged sets because a fresh sessionId was generated on every
  // mount — this restores the same in-progress session from localStorage
  // and hydrates already-logged sets from IndexedDB).
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [phase, setPhase] = useState<"review" | "active" | "complete">("review");
  const [completedAt, setCompletedAt] = useState<number | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [swapped, setSwapped] = useState<Record<string, Exercise>>({});
  const [restingFor, setRestingFor] = useState<string | null>(null);
  const [setsByExercise, setSetsByExercise] = useState<Record<string, SetRowValue[]>>(() =>
    Object.fromEntries(rows.map((r) => [r.we.id, initialSets(r.we.sets)])),
  );

  useEffect(() => {
    let resolvedId = getActiveSessionId(workout.id);
    if (!resolvedId) {
      resolvedId = uuid();
      setActiveSessionId(workout.id, resolvedId);
    }
    // Genuine one-time async-source fetch (localStorage pointer + IndexedDB
    // hydration), not derivable during render — the rule's "cascading
    // render" concern targets state that could be computed synchronously
    // instead; this state literally doesn't exist until this read resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(resolvedId);

    getLocalSetLogsForSession(resolvedId).then((logs) => {
      if (logs.length === 0) return;
      // Sort oldest-first so a stray duplicate row (e.g. from data written
      // before the deterministic-id fix below) can't win by iteration-order
      // luck — last-by-completedAt always wins, deterministically, matching
      // what "the current value of this set" should mean.
      const ordered = [...logs].sort(
        (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(),
      );
      setSetsByExercise((prev) => {
        const next = { ...prev };
        for (const log of ordered) {
          const existing = next[log.workoutExerciseId];
          if (!existing) continue;
          next[log.workoutExerciseId] = existing.map((s) =>
            s.setIndex === log.setIndex
              ? {
                  setIndex: s.setIndex,
                  weight: log.weight != null ? String(log.weight) : "",
                  reps: log.reps != null ? String(log.reps) : "",
                  completed: !log.skipped,
                  skipped: log.skipped,
                }
              : s,
          );
        }
        return next;
      });
      // A reload mid-workout means the review screen already happened once.
      setPhase((p) => (p === "review" ? "active" : p));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- workout.id is stable for this route
  }, []);

  const totalLoggedSets = Object.values(setsByExercise)
    .flat()
    .filter((s) => s.completed).length;

  if (phase === "review") {
    return (
      <PlayerReview
        workout={workout}
        category={category}
        rows={rows}
        onStart={() => setPhase("active")}
      />
    );
  }

  if (phase === "complete") {
    return (
      <PlayerComplete
        workoutTitle={workout.title}
        durationSeconds={((completedAt ?? startedAt) - startedAt) / 1000}
        setsCompleted={totalLoggedSets}
        streak={baselineStreak + 1}
      />
    );
  }

  const step = steps[stepIndex];

  function finishOrAdvance() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      clearActiveSessionId(workout.id);
      if (sessionId) void clearLocalSetLogsForSession(sessionId);
      setCompletedAt(Date.now());
      setPhase("complete");
    }
  }

  async function updateSet(weId: string, setIndex: number, next: SetRowValue) {
    setSetsByExercise((prev) => ({
      ...prev,
      [weId]: prev[weId].map((s) => (s.setIndex === setIndex ? next : s)),
    }));
  }

  async function completeSet(weId: string, value: SetRowValue) {
    if (!sessionId) return;
    const next = { ...value, completed: true, skipped: false };
    await updateSet(weId, value.setIndex, next);
    await saveSetLogLocally({
      // Deterministic per-slot id — re-completing an edited set overwrites
      // its own row instead of inserting a second one (see offline-store.ts).
      id: `${sessionId}:${weId}:${value.setIndex}`,
      sessionId,
      workoutExerciseId: weId,
      setIndex: value.setIndex,
      weight: value.weight ? Number(value.weight) : undefined,
      reps: value.reps ? Number(value.reps) : undefined,
      completedAt: new Date().toISOString(),
      skipped: false,
    });
    setRestingFor(weId);
  }

  async function skipSet(weId: string, value: SetRowValue) {
    if (!sessionId) return;
    const next = { ...value, completed: false, skipped: true };
    await updateSet(weId, value.setIndex, next);
    await saveSetLogLocally({
      id: `${sessionId}:${weId}:${value.setIndex}`,
      sessionId,
      workoutExerciseId: weId,
      setIndex: value.setIndex,
      completedAt: new Date().toISOString(),
      skipped: true,
    });
  }

  function skipExercise(weId: string) {
    setSetsByExercise((prev) => ({
      ...prev,
      [weId]: prev[weId].map((s) => (s.completed ? s : { ...s, skipped: true })),
    }));
  }

  function substitute(weId: string, sub: Exercise) {
    setSwapped((prev) => ({ ...prev, [weId]: sub }));
  }

  const stepDone = step.every((r) =>
    setsByExercise[r.we.id].every((s) => s.completed || s.skipped),
  );

  return (
    <div className="flex flex-1 flex-col">
      <header className="safe-top flex items-center justify-between border-b border-border px-4 py-3">
        <button
          onClick={() => router.push("/home")}
          aria-label="Exit workout"
          className="flex h-9 w-9 items-center justify-center text-text-muted"
        >
          <X size={20} />
        </button>
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-text-muted">
          Step {stepIndex + 1} of {steps.length}
        </span>
        <span className="w-9" aria-hidden />
      </header>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
        {restingFor && step.some((r) => r.we.id === restingFor) ? (
          <RestTimer
            seconds={step.find((r) => r.we.id === restingFor)!.we.restSeconds}
            onDone={() => setRestingFor(null)}
          />
        ) : null}

        {step.map(({ we, exercise, subs }) => {
          const active = swapped[we.id] ?? exercise;
          return (
            <section key={we.id} className="flex flex-col gap-3">
              {step.length > 1 && (
                <span className="font-body w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Superset
                </span>
              )}
              <VideoPlaceholder label={active.name} className="aspect-[16/9]" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display uppercase tracking-tight text-2xl leading-none">
                    {active.name}
                  </h2>
                  <p className="font-body mt-1 text-xs uppercase tracking-wide text-text-muted">
                    {we.sets} Sets • {we.repsPrescribed} Reps
                    {we.tempo ? ` • Tempo ${we.tempo}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {subs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => substitute(we.id, subs[0])}
                      aria-label={`Substitute ${active.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-app border border-border text-text-muted hover:text-primary"
                    >
                      <RefreshCw size={15} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => skipExercise(we.id)}
                    aria-label={`Skip ${active.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-app border border-border text-text-muted hover:text-danger"
                  >
                    <SkipForward size={15} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {setsByExercise[we.id].map((s) => (
                  <SetRow
                    key={s.setIndex}
                    value={s}
                    onChange={(next) => updateSet(we.id, s.setIndex, next)}
                    onComplete={() => completeSet(we.id, s)}
                    onSkip={() => skipSet(we.id, s)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="safe-bottom flex items-center gap-3 border-t border-border px-5 py-4">
        <button
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          aria-label="Previous exercise"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-app border border-border text-text disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={finishOrAdvance}
          className="font-body h-12 flex-1 rounded-app bg-primary text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-60"
        >
          {stepDone
            ? stepIndex < steps.length - 1
              ? "Next Exercise"
              : "Finish Workout"
            : "Skip to Next"}
        </button>
        <button
          disabled={stepIndex === steps.length - 1}
          onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
          aria-label="Next exercise"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-app border border-border text-text disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
