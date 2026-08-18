"use client";

import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/**
 * Non-blocking "offline — will sync" indicator (ISC-102). Never a modal,
 * never a dead-end error — just a small persistent strip that goes away
 * the moment connectivity returns.
 *
 * Uses useSyncExternalStore rather than useState+useEffect: navigator.onLine
 * is unknowable during SSR, and assuming "online" for the server snapshot
 * (getServerSnapshot below) lets React reconcile the real client value on
 * hydration without a mismatch warning — a plain useState initializer read
 * from `navigator` at module/render time caused exactly that mismatch.
 */
export function OfflineIndicator() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );

  if (online) return null;

  return (
    <div
      role="status"
      className="safe-top flex items-center justify-center gap-2 bg-text px-4 py-2 text-center"
    >
      <WifiOff size={14} className="text-bg" aria-hidden />
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-bg">
        Offline — your progress will sync when you&apos;re back
      </span>
    </div>
  );
}
