export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  // Immersive — no BottomNav here (ISC-96). The player owns the whole screen.
  return <div className="flex min-h-full flex-1 flex-col bg-bg">{children}</div>;
}
