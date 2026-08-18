import { get, set, del, keys } from "idb-keyval";
import type { SetLog } from "@/lib/types";

/**
 * Offline-first set-log persistence (ISC-100/101/103). Writes go here
 * BEFORE any remote call is attempted — IndexedDB via idb-keyval, keyed on
 * the set_log's own client-generated uuid (lib/utils.ts `uuid()`), so a
 * later sync is `upsert on (id)` and naturally idempotent (ISA Decisions,
 * SystemsThinking finding).
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
 * Reconciliation seam (ISC-103): nothing remote exists yet, so this is a
 * no-op that always reports success. Once Supabase is live, this becomes
 * an `upsert` of every unsynced local entry, still keyed on `id`.
 */
export async function syncSetLogs(): Promise<{ synced: number }> {
  return { synced: 0 };
}
