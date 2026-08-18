import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { VideoPlaceholder } from "@/components/ui/video-placeholder";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { getExerciseBySlug } from "@/lib/data/repo";

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exercise = await getExerciseBySlug(slug);
  if (!exercise) notFound();

  return (
    <div className="flex flex-col gap-6 px-5 pt-5 pb-8">
      <VideoPlaceholder label={exercise.name} />

      <HeadlineRule title={exercise.name} eyebrow={exercise.primaryMuscle} />

      <section className="flex flex-col gap-2">
        <h2 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Cues
        </h2>
        <ul className="flex flex-col gap-2">
          {exercise.cues.map((cue) => (
            <li key={cue} className="font-body flex gap-2 text-sm text-text">
              <span className="text-primary">—</span>
              {cue}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          Common Mistakes
        </h2>
        <ul className="flex flex-col gap-2">
          {exercise.commonMistakes.map((m) => (
            <li key={m} className="font-body flex gap-2 text-sm text-text-muted">
              <span className="text-danger">✕</span>
              {m}
            </li>
          ))}
        </ul>
      </section>

      {exercise.substitutions && exercise.substitutions.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="font-body flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
            <ArrowLeftRight size={13} aria-hidden />
            Substitutions
          </h2>
          <div className="flex flex-wrap gap-2">
            {exercise.substitutions.map((s) => (
              <Link
                key={s}
                href={`/exercises/${s}`}
                className="font-body rounded-full border border-border px-3 py-1.5 text-xs text-text hover:border-primary hover:text-primary"
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
