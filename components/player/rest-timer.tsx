"use client";

import { useEffect, useRef, useState } from "react";
import { SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Auto-starts on set completion (ISC-79), shows a visible countdown, fires
 * a completion cue (ISC-80), and is skippable early (IterativeDepth
 * finding — real athletes don't always wait the full rest). Callers mount
 * a fresh instance per rest period (conditional render keyed on which
 * exercise is resting), so `seconds` never changes on a live instance.
 */
export function RestTimer({
  seconds,
  onDone,
}: {
  seconds: number;
  onDone: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (remaining <= 0) {
      if ("vibrate" in navigator) navigator.vibrate([80, 40, 80]);
      doneRef.current();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const pct = Math.max(0, Math.min(100, (remaining / seconds) * 100));

  return (
    <div className="flex flex-col items-center gap-4 rounded-app border border-border bg-surface p-6">
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-text-muted">
        Rest
      </span>
      <div
        role="timer"
        aria-live="polite"
        className="font-display text-6xl tabular-nums leading-none tracking-tight text-primary"
      >
        {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
      </div>
      <div className="h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Button variant="secondary" size="sm" onClick={() => setRemaining(0)}>
        <SkipForward size={14} aria-hidden />
        Skip Rest
      </Button>
    </div>
  );
}
