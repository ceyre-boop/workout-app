import Link from "next/link";
import { User, Settings, CreditCard, ChevronRight, LogOut } from "lucide-react";
import { HeadlineRule } from "@/components/ui/headline-rule";
import { BRAND } from "@/lib/brand";

const ROWS = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/paywall", label: "Membership", icon: CreditCard },
] as const;

export default function MorePage() {
  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <HeadlineRule title="More" />
      <nav className="flex flex-col divide-y divide-border overflow-hidden rounded-app border border-border bg-surface">
        {ROWS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-bg"
          >
            <Icon size={18} className="text-primary" aria-hidden />
            <span className="font-body flex-1 text-sm font-medium text-text">
              {label}
            </span>
            <ChevronRight size={16} className="text-text-muted" aria-hidden />
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="font-body flex items-center gap-2 self-start px-1 text-sm text-text-muted hover:text-danger"
      >
        <LogOut size={16} aria-hidden />
        Sign Out
      </button>
      <p className="font-body px-1 text-xs text-text-muted">{BRAND.name}</p>
    </div>
  );
}
