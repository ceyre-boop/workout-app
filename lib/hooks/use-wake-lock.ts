"use client";

import { useEffect, useRef } from "react";

/**
 * Requests a screen wake lock while the component is mounted (ISC-76) and
 * releases it on unmount or when the tab goes hidden/visible again — the
 * Wake Lock API auto-releases on tab-hide, so we re-acquire on visibility
 * return rather than leaving the player screen dark mid-set.
 */
export function useWakeLock() {
  const lockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!("wakeLock" in navigator)) return;

    let cancelled = false;

    async function acquire() {
      try {
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          lock.release().catch(() => {});
          return;
        }
        lockRef.current = lock;
      } catch {
        // Permission denied or unsupported context — fail silently, the
        // player still works, it just won't keep the screen awake.
      }
    }

    acquire();

    function onVisibility() {
      if (document.visibilityState === "visible" && !lockRef.current) {
        acquire();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      lockRef.current?.release().catch(() => {});
      lockRef.current = null;
    };
  }, []);
}
