import { Flame, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { PhotoCard } from "@/components/ui/photo-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { Badge, CategoryBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ListRowSkeleton, ProgramCardSkeleton } from "@/components/ui/skeleton";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function ComponentGallery() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <Section title="Headline Rule">
        <HeadlineRule eyebrow="Today's Focus" title="Lower Body Strength" />
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Start Workout</Button>
          <Button variant="secondary">View Program</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="destructive" size="sm">
            Cancel
          </Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <CategoryBadge category="strength" />
          <CategoryBadge category="running" />
          <CategoryBadge category="hybrid" />
          <CategoryBadge category="race-prep" />
          <Badge variant="primary">New</Badge>
        </div>
      </Section>

      <Section title="Photo Card">
        <div className="grid grid-cols-2 gap-3">
          <PhotoCard
            category="strength"
            eyebrow="8 Weeks"
            title="Foundation Strength"
            meta="12 Workouts"
          />
          <PhotoCard
            category="running"
            variant="row"
            eyebrow="45 Min"
            title="Base Building Run"
          />
        </div>
      </Section>

      <Section title="Progress Bar">
        <ProgressBar value={4} max={6} label="Weekly workouts completed" />
      </Section>

      <Section title="Stat Card">
        <div className="grid grid-cols-2 gap-3">
          <StatCard value={24} label="Workouts This Month" icon={Dumbbell} />
          <StatCard value="6" label="Day Streak" chip="Personal Best" icon={Flame} />
        </div>
      </Section>

      <Section title="Empty State">
        <EmptyState
          icon={Dumbbell}
          title="No Programs Yet"
          body="Browse the library and start your first program."
          ctaLabel="Browse Programs"
          ctaHref="/programs"
        />
      </Section>

      <Section title="Skeletons">
        <div className="grid grid-cols-2 gap-3">
          <ProgramCardSkeleton />
          <div className="rounded-app border border-border">
            <ListRowSkeleton />
          </div>
        </div>
      </Section>

      <Section title="Type">
        <div className="flex flex-col gap-2">
          <p className="font-display uppercase tracking-tight text-4xl leading-none">
            24
          </p>
          <p className="font-body text-xs uppercase tracking-wide text-text-muted">
            4 Sets • 10 Reps
          </p>
          <p className="font-script text-3xl text-primary">Well done.</p>
        </div>
      </Section>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="min-h-full">
      <div className="border-b border-border p-6">
        <h1 className="font-display uppercase tracking-tight text-2xl">
          Styleguide
        </h1>
        <p className="font-body text-sm text-text-muted">
          Every base component, both themes, side by side — no toggle round-trip needed.
        </p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div data-theme="light" className="bg-bg text-text">
          <p className="font-body px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
            Light
          </p>
          <ComponentGallery />
        </div>
        <div data-theme="dark" className="bg-bg text-text">
          <p className="font-body px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
            Dark
          </p>
          <ComponentGallery />
        </div>
      </div>
    </div>
  );
}
