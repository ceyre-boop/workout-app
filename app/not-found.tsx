import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <Compass size={40} className="text-primary" aria-hidden />
      <h1 className="font-display uppercase tracking-tight text-3xl">
        Off the Map
      </h1>
      <p className="font-body max-w-xs text-sm text-text-muted">
        That page doesn&apos;t exist. Head back and pick up where you left
        off.
      </p>
      <Link href="/home" className={buttonVariants({ className: "mt-1" })}>
        Back to Home
      </Link>
    </div>
  );
}
