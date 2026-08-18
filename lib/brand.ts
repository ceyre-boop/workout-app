/**
 * Single source of truth for the creator/brand name.
 *
 * ASSUMPTION (flagged in the final report, not yet confirmed by the user):
 * the brief's reference boards say "ALISSA," but the brief's own open
 * questions (§10.1) already flag that as possibly placeholder/competitor
 * board text rather than the real brand. The user separately named
 * "Britney" as the real demo stakeholder. Reading those together, this
 * build treats "Britney" as the real creator name. If that's wrong,
 * changing the fields below is the entire fix — nothing else in the app
 * hardcodes the name.
 */
export const BRAND = {
  creatorFirstName: "Britney",
  name: "Train with Britney",
  shortName: "TWB",
  slug: "britney",
  tagline: "Train with purpose.",
  description: "Programs built for real life and real results.",
} as const;
