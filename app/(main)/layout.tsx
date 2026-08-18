import { BottomNav } from "@/components/ui/bottom-nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <main className="mx-auto w-full max-w-lg flex-1 pb-4">{children}</main>
      <BottomNav />
    </div>
  );
}
