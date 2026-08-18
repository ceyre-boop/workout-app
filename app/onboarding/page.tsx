"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { BRAND } from "@/lib/brand";

const GOALS = ["Lose Fat", "Build Muscle", "Get Faster", "Feel Better", "Race Ready"];
const EXPERIENCE = ["New to Training", "Some Experience", "Very Experienced"];
const EQUIPMENT = ["Full Gym", "Home — Dumbbells", "Bodyweight Only", "Kettlebells"];
const SCHEDULE = ["2 Days / Week", "3 Days / Week", "4+ Days / Week"];

function ChoiceGrid({
  options,
  selected,
  onToggle,
  multi = true,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            aria-pressed={active}
            className={cn(
              "font-body rounded-app border px-4 py-4 text-left text-sm font-semibold transition-colors",
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-text hover:border-primary/50",
            )}
          >
            {opt}
          </button>
        );
      })}
      {!multi && null}
    </div>
  );
}

const STEPS = ["goals", "experience", "equipment", "schedule", "done"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);

  const step = STEPS[stepIndex];
  const toggle = (arr: string[], set: (v: string[]) => void, val: string, single = false) => {
    if (single) return set([val]);
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const canAdvance =
    step === "goals" ? goals.length > 0
    : step === "experience" ? experience.length > 0
    : step === "equipment" ? equipment.length > 0
    : step === "schedule" ? schedule.length > 0
    : true;

  function next() {
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
    else router.push("/home");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-1 flex-col px-6 py-8">
      {step !== "done" && (
        <div className="mb-8 flex items-center gap-1.5" aria-label="Onboarding progress">
          {STEPS.slice(0, -1).map((s, i) => (
            <span
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= stepIndex ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
      )}

      {step === "goals" && (
        <div className="flex flex-1 flex-col gap-6">
          <HeadlineRule eyebrow="Step 1 of 4" title="What's Your Goal?" />
          <ChoiceGrid options={GOALS} selected={goals} onToggle={(v) => toggle(goals, setGoals, v)} />
        </div>
      )}
      {step === "experience" && (
        <div className="flex flex-1 flex-col gap-6">
          <HeadlineRule eyebrow="Step 2 of 4" title="Your Experience" />
          <ChoiceGrid
            options={EXPERIENCE}
            selected={experience}
            onToggle={(v) => toggle(experience, setExperience, v, true)}
          />
        </div>
      )}
      {step === "equipment" && (
        <div className="flex flex-1 flex-col gap-6">
          <HeadlineRule eyebrow="Step 3 of 4" title="Available Equipment" />
          <ChoiceGrid
            options={EQUIPMENT}
            selected={equipment}
            onToggle={(v) => toggle(equipment, setEquipment, v)}
          />
        </div>
      )}
      {step === "schedule" && (
        <div className="flex flex-1 flex-col gap-6">
          <HeadlineRule eyebrow="Step 4 of 4" title="Your Schedule" />
          <ChoiceGrid
            options={SCHEDULE}
            selected={schedule}
            onToggle={(v) => toggle(schedule, setSchedule, v, true)}
          />
        </div>
      )}
      {step === "done" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <span className="font-script text-5xl text-primary">You&apos;re all set.</span>
          <p className="font-body max-w-xs text-sm text-text-muted">
            {BRAND.name} has a plan built around what you told us. Let&apos;s go.
          </p>
        </div>
      )}

      <div className="mt-8">
        <Button size="lg" className="w-full" disabled={!canAdvance} onClick={next}>
          {step === "done" ? "Enter the App" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
