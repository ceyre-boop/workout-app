import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-1 flex-col justify-center px-6 py-10">
      <Link href="/home" className="mb-8 self-start">
        <span className="font-display uppercase tracking-tight text-xl text-text">
          {BRAND.name}
        </span>
      </Link>
      {children}
    </div>
  );
}
