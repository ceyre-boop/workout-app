import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { CategoryBadge } from "@/components/ui/badge";
import { getProfile, getEnrollments, getPrograms } from "@/lib/data/repo";

export default async function ProfilePage() {
  const [profile, enrollments, programs] = await Promise.all([
    getProfile(),
    getEnrollments(),
    getPrograms(),
  ]);

  const enrolledPrograms = enrollments
    .map((e) => ({ enrollment: e, program: programs.find((p) => p.id === e.programId) }))
    .filter((r) => r.program);

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <Link href="/more" className="flex items-center gap-1 text-text-muted">
        <ChevronLeft size={16} aria-hidden />
        <span className="font-body text-xs uppercase tracking-wide">More</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-display uppercase text-white">
          {profile.displayName.charAt(0)}
        </div>
        <div>
          <h1 className="font-display uppercase tracking-tight text-2xl">
            {profile.displayName}
          </h1>
          <p className="font-body text-xs uppercase tracking-wide text-text-muted">
            {profile.units === "metric" ? "Metric" : "Imperial"} • {profile.tz}
          </p>
        </div>
      </div>

      <HeadlineRule title="Your Programs" />
      <div className="flex flex-col gap-3">
        {enrolledPrograms.map(({ enrollment, program }) => (
          <Link
            key={enrollment.id}
            href={`/programs/${program!.slug}`}
            className="flex items-center justify-between rounded-app border border-border bg-surface p-4"
          >
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm font-semibold text-text">{program!.title}</span>
              <CategoryBadge category={program!.category} />
            </div>
            <span className="font-body text-xs uppercase tracking-wide text-text-muted">
              Week {enrollment.currentWeek}/{program!.durationWeeks}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
