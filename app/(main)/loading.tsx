import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="flex flex-col gap-4 px-5 pt-6">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
