"use client";

import { useState } from "react";
import { PhotoCard } from "@/components/ui/photo-card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { EmptyState } from "@/components/ui/empty-state";
import { Dumbbell } from "lucide-react";
import type { Program } from "@/lib/types";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Strength", value: "strength" },
  { label: "Running", value: "running" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Race Prep", value: "race-prep" },
] as const;

export function ProgramsFilterList({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const visible = filter === "all" ? programs : programs.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-5">
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5">
        <SegmentedControl value={filter} onChange={setFilter} options={[...FILTERS]} />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="Nothing Here Yet"
          body="No programs in this category yet — check back soon."
          ctaLabel="View All"
          ctaHref="/programs"
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {visible.map((p) => (
            <PhotoCard
              key={p.id}
              href={`/programs/${p.slug}`}
              category={p.category}
              title={p.title}
              meta={`${p.durationWeeks} Weeks`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
