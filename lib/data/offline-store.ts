import { get, set, del, keys } from "idb-keyval";
import type { SetLog } from "@/lib/types";

/**
 * Offline-first set-log persistence (ISC-100/101/103). Writes go here
 * BEFORE any remote call is attempted — IndexedDB via idb-keyval, keyed on
 * the set_log's own id, so a later sync is `upsert on (id)` and naturally
 * idempotent (ISA Decisions, SystemsThinking finding).
 *
 * The id is a deterministic composite (`${sessionId}:${workoutExerciseId}:${setIndex}`,
 * built by the caller), not a fresh `crypto.randomUUID()` per write —
 * adversarial review caught that random-per-write ids let an edited-then-
 * recompleted set produce a second row instead of overwriting the first,
 * with reload-hydration order then deciding (nondeterministically) which
 * value won. A stable per-slot id makes `set()` overwrite in place, so
 * there is exactly one row per (session, exercise, set) — duplicates are
 * structurally impossible rather than merely deduped after the fact.
 */
const KEY_PREFIX = "setlog:";

export async function saveSetLogLocally(entry: SetLog): Promise<void> {
  await set(`${KEY_PREFIX}${entry.id}`, entry);
}

export async function getLocalSetLogsForSession(sessionId: string): Promise<SetLog[]> {
  const allKeys = await keys();
  const entries = await Promise.all(
    allKeys
      .filter((k): k is string => typeof k === "string" && k.startsWith(KEY_PREFIX))
      .map((k) => get<SetLog>(k)),
  );
  return entries.filter((e): e is SetLog => !!e && e.sessionId === sessionId);
}

export async function deleteLocalSetLog(id: string): Promise<void> {
  await del(`${KEY_PREFIX}${id}`);
}

/**
 * Clears every locally-buffered set log for a finished session. The
 * offline store is a staging buffer for the ONE active session, not
 * permanent history (mock/real session history lives server-side once
 * Supabase is live) — without this, adversarial review correctly flagged
 * that every workout ever done would accumulate in IndexedDB forever, with
 * `getLocalSetLogsForSession`'s full-store `keys()` scan getting slower on
 * every mount as it grew.
 */
export async function clearLocalSetLogsForSession(sessionId: string): Promise<void> {
  const logs = await getLocalSetLogsForSession(sessionId);
  await Promise.all(logs.map((l) => deleteLocalSetLog(l.id)));
}

/**
 * Reconciliation seam (ISC-103): nothing remote exists yet, so this is a
 * no-op that always reports success. Once Supabase is live, this becomes
 * an `upsert` of every unsynced local entry, still keyed on `id`, followed
 * by `clearLocalSetLogsForSession` once the upsert confirms.
 */
export async function syncSetLogs(): Promise<{ synced: number }> {
  return { synced: 0 };
}
