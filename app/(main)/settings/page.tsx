"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ThemeToggle } from "@/components/theme-toggle";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <span className="font-body text-sm font-medium text-text">{label}</span>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [units, setUnits] = useState<"metric" | "imperial">("imperial");

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <Link href="/more" className="flex items-center gap-1 text-text-muted">
        <ChevronLeft size={16} aria-hidden />
        <span className="font-body text-xs uppercase tracking-wide">More</span>
      </Link>
      <HeadlineRule title="Settings" />

      <section>
        <h3 className="font-body mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Preferences
        </h3>
        <Row label="Units">
          <SegmentedControl
            value={units}
            onChange={setUnits}
            options={[
              { label: "Imperial", value: "imperial" },
              { label: "Metric", value: "metric" },
            ]}
          />
        </Row>
        <Row label="Appearance">
          <ThemeToggle />
        </Row>
      </section>

      <section>
        <h3 className="font-body mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Account
        </h3>
        <Row label="Email">
          <span className="font-body text-sm text-text-muted">member@example.com</span>
        </Row>
        <Row label="Password">
          <Link href="/reset-password" className="font-body text-sm text-primary underline underline-offset-2">
            Change
          </Link>
        </Row>
      </section>
    </div>
  );
}
