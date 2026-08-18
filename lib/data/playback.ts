/**
 * Mux signed-playback integration seam (brief §7 — content protection).
 * Not wired to a live Mux account this session. A real implementation
 * issues a short-TTL signed URL server-side after a subscription check.
 *
 * Returns null in mock mode rather than a fake file path — no real demo
 * footage exists yet, and a `<video src>` pointing at a nonexistent file
 * would be a broken element (same reasoning as the photo placeholders).
 * UI consumers render VideoPlaceholder when this resolves to null.
 */
export async function getPlaybackUrl(_exerciseId: string): Promise<string | null> {
  void _exerciseId;
  return null;
}
