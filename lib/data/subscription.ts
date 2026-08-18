/**
 * Stripe integration seam (brief §7). Not wired to a live Stripe account
 * this session — mock-implemented so screen code (Paywall gating) already
 * calls the real interface shape. Swapping in a real Stripe-backed
 * implementation later means rewriting this function body only.
 */
export async function hasActiveSubscription(_userId: string): Promise<boolean> {
  void _userId;
  // Mock: everyone is "subscribed" in the demo so the golden path (starting
  // a program, opening the player) isn't blocked behind a paywall the
  // stakeholder can't get past. The gate itself (ISC-92) is still reachable
  // directly at /paywall to demonstrate the flow.
  return true;
}
