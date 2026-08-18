"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const PLANS = [
  { id: "monthly", label: "Monthly", price: "$19", period: "/ month" },
  { id: "annual", label: "Annual", price: "$149", period: "/ year", tag: "Save 35%" },
] as const;

const FEATURES = [
  "Every program, every workout",
  "New releases the moment they publish",
  "Offline access — never lose a logged set",
  "Progress tracking across every session",
];

export default function PaywallPage() {
  return (
    <Suspense fallback={null}>
      <PaywallContent />
    </Suspense>
  );
}

function PaywallContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/home";
  const [plan, setPlan] = useState<(typeof PLANS)[number]["id"]>("annual");
  const [loading, setLoading] = useState(false);

  function subscribe() {
    setLoading(true);
    // Mock — real Stripe Checkout wires in here via a server action that
    // calls the seam in lib/data/subscription.ts (see ISA Constraints).
    setTimeout(() => router.push(redirectTo), 500);
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-1 flex-col px-6 py-6">
      <button
        onClick={() => router.back()}
        aria-label="Close"
        className="mb-6 self-end text-text-muted hover:text-text"
      >
        <X size={22} />
      </button>

      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <span className="font-script text-3xl text-primary">Unlock everything.</span>
          <h1 className="font-display uppercase tracking-tight text-2xl">
            {BRAND.name} Membership
          </h1>
        </div>

        <ul className="flex flex-col gap-2.5">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
              <span className="font-body text-sm text-text">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          {PLANS.map((p) => {
            const active = plan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-between rounded-app border px-4 py-4 text-left transition-colors",
                  active ? "border-primary bg-primary/10" : "border-border bg-surface",
                )}
              >
                <div className="flex flex-col">
                  <span className="font-body text-sm font-semibold text-text">{p.label}</span>
                  {"tag" in p && (
                    <span className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-display text-xl tracking-tight text-text">{p.price}</span>
                  <span className="font-body ml-1 text-xs text-text-muted">{p.period}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button size="lg" onClick={subscribe} disabled={loading}>
          {loading ? "Starting Trial…" : "Start 7-Day Free Trial"}
        </Button>
        <p className="font-body text-center text-xs text-text-muted">
          Cancel anytime from Settings. No commitment.
        </p>
      </div>
    </div>
  );
}
