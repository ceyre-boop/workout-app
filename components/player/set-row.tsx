"use client";

import { Check, X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SetRowValue {
  setIndex: number;
  weight: string;
  reps: string;
  completed: boolean;
  skipped: boolean;
}

/**
 * Large touch-target weight/reps entry (ISC-77), prefilled from history
 * (ISC-78, handled by the caller passing initial weight/reps), editable
 * after logging (IterativeDepth finding — real users correct entries).
 */
export function SetRow({
  value,
  onChange,
  onComplete,
  onSkip,
}: {
  value: SetRowValue;
  onChange: (next: SetRowValue) => void;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const locked = value.completed || value.skipped;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-app border p-3",
        value.completed
          ? "border-success/40 bg-success/5"
          : value.skipped
            ? "border-border bg-bg opacity-60"
            : "border-border bg-surface",
      )}
    >
      <span className="font-display w-6 shrink-0 text-center text-lg text-text-muted">
        {value.setIndex}
      </span>

      <label className="flex flex-1 flex-col gap-1">
        <span className="font-body text-[10px] uppercase tracking-wide text-text-muted">
          Weight
        </span>
        <input
          inputMode="decimal"
          value={value.weight}
          disabled={locked}
          onChange={(e) => onChange({ ...value, weight: e.target.value })}
          className="font-body h-11 w-full rounded-app border border-border bg-transparent px-3 text-base text-text disabled:opacity-70"
          aria-label={`Set ${value.setIndex} weight`}
        />
      </label>

      <label className="flex flex-1 flex-col gap-1">
        <span className="font-body text-[10px] uppercase tracking-wide text-text-muted">
          Reps
        </span>
        <input
          inputMode="numeric"
          value={value.reps}
          disabled={locked}
          onChange={(e) => onChange({ ...value, reps: e.target.value })}
          className="font-body h-11 w-full rounded-app border border-border bg-transparent px-3 text-base text-text disabled:opacity-70"
          aria-label={`Set ${value.setIndex} reps`}
        />
      </label>

      {locked ? (
        <button
          type="button"
          aria-label={`Edit set ${value.setIndex}`}
          onClick={() => onChange({ ...value, completed: false, skipped: false })}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-app border border-border text-text-muted hover:text-text"
        >
          <Pencil size={16} />
        </button>
      ) : (
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={`Skip set ${value.setIndex}`}
            onClick={onSkip}
            className="flex h-11 w-11 items-center justify-center rounded-app border border-border text-text-muted hover:text-danger"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            aria-label={`Complete set ${value.setIndex}`}
            onClick={onComplete}
            className="flex h-11 w-11 items-center justify-center rounded-app bg-primary text-white hover:opacity-90"
          >
            <Check size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
