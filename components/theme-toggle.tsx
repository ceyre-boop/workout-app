"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) return <div className="h-9 w-40" aria-hidden />;

  return (
    <SegmentedControl
      value={(theme ?? "system") as "light" | "dark" | "system"}
      onChange={setTheme}
      options={[
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Auto", value: "system" },
      ]}
    />
  );
}

export function ThemeToggleIcons() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();
  if (!mounted) return null;

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "Auto" },
    { value: "dark", icon: Moon, label: "Dark" },
  ] as const;

  return (
    <div className="inline-flex items-center rounded-app border border-border bg-surface p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
          className={`flex h-8 w-8 items-center justify-center rounded-[2px] transition-colors ${
            theme === value ? "bg-primary text-white" : "text-text-muted hover:text-text"
          }`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
