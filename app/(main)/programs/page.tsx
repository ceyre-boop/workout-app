import { HeadlineRule } from "@/components/ui/headline-rule";
import { getPrograms } from "@/lib/data/repo";
import { ProgramsFilterList } from "./programs-filter-list";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <HeadlineRule title="Programs" />
      <ProgramsFilterList programs={programs} />
    </div>
  );
}
