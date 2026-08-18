/**
 * Single source of truth for the creator/brand name.
 *
 * Confirmed 2026-08-18: the reference brand boards say "Train with Alissa."
 * The earlier build guess ("Britney") was a stated, flagged assumption —
 * corrected the moment the real boards were shared. This is the only file
 * that needed to change.
 */
export const BRAND = {
  creatorFirstName: "Alissa",
  name: "Train with Alissa",
  shortName: "TWA",
  slug: "alissa",
  tagline: "Train with purpose.",
  description: "Programs built for real life and real results.",
} as const;
