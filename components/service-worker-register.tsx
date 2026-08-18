"use client";

import { useEffect } from "react";

/**
 * Registers the offline app-shell service worker (ISC-107). A plain
 * `useEffect` calling a browser API is the sanctioned "synchronize with an
 * external system" case — no setState involved, so it doesn't trip the
 * set-state-in-effect rule. Registration itself, not a rendered `<script>`
 * tag (React doesn't reliably execute inline scripts on client renders).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return null;
}
