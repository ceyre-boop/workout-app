"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after client hydration. Used to defer theme-dependent UI until
 * the client value is known, avoiding a hydration mismatch — implemented
 * via useSyncExternalStore (not setState-in-effect) so it stays a pure
 * render per the React Compiler rules.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
