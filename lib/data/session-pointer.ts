/**
 * Tracks which session-uuid is "the current in-progress session" for a
 * given workout, in localStorage. Without this, a page reload would
 * generate a fresh session id and the previously-logged sets — durably
 * saved in IndexedDB under the OLD session id — would become orphaned and
 * invisible, defeating the entire point of offline-first logging (ISC-101).
 */
const KEY_PREFIX = "twb:active-session:";

export function getActiveSessionId(workoutId: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY_PREFIX + workoutId);
}

export function setActiveSessionId(workoutId: string, sessionId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_PREFIX + workoutId, sessionId);
}

export function clearActiveSessionId(workoutId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY_PREFIX + workoutId);
}
