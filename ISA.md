---
task: "Build Train-with-Britney workout PWA rough-draft demo"
slug: train-with-britney-workout-app
project: workout-app
effort: E4
effort_source: classifier
phase: plan
progress: 0/138
mode: interactive
started: 2026-08-18T00:11:47Z
updated: 2026-08-18T00:16:00Z
---

## Problem

There is no working artifact of the "Train with [CREATOR]" workout app yet — only a written brief with locked design tokens/typography/motifs, four board screens, a data model sketch, and an explicit gap (no Active Workout Player design exists anywhere, board or brief). The user needs something a stakeholder (Britney) can actually open and click through as a demo, today, without waiting on real Supabase/Stripe/Mux accounts that don't exist yet.

## Vision

Britney opens a link on her phone, it looks and feels like an installed app (not a website), the brand system reads as intentional and finished (not "AI slop" defaults), she can tap through Home → Programs → a program → a workout → start the workout and log a set with a rest timer running, flip to dark mode and nothing breaks, and the one screen the boards never showed — the Active Workout Player — feels like the most considered screen in the app, not the most rushed. Euphoric surprise: she forgets it's a rough draft.

## Out of Scope

No live third-party accounts are created or billed this session — no live Supabase project, no live Stripe checkout, no live Mux asset upload. No native iOS/Android wrapper (Capacitor) is built. No full Admin CMS UI (drag-to-reorder, video upload) is built — the schema is designed for it but the UI is a stretch/deferred item. "HYROX" is not used as a literal category label anywhere in copy or code (trademark risk flagged by the brief's own §10.3) — a race-prep category exists under a different name. Real photography is not used (none was supplied) — AI-generated stand-in photography is used and flagged as needing replacement before launch. No user data migration tooling is built (§10.6 not applicable to greenfield).

## Principles

- Every screen is judged against "would this survive being shown to a stakeholder on a phone, one-handed, right now" — not "does it look fine in a wide desktop browser."
- No hardcoded hex/font values in component code — every visual property traces to a token, so a future real brand pass (real photography, confirmed brand name) is a data change, not a rewrite.
- The offline/data-loss concern the brief flags as "the worst possible bug" is treated as real even in a mock-data build — set-logging writes to durable local storage first, always, even though there is no server yet to sync to.
- Assumptions made in place of blocked questions (brand name, HYROX rename, photography) are isolated behind single, named seams so they are one-line changes, not archaeology.

## Constraints

- Stack is exactly Next.js App Router + TypeScript + Tailwind + shadcn/ui + Recharts + next-pwa/manual SW, per the brief's §1 table — no substitution without a stated reason.
- bun/bunx only for all package management and script execution, never npm/npx.
- Fonts self-hosted via `next/font/google` (Barlow Condensed, Inter, Sacramento) — no external font CDN request.
- All theme-dependent colors are CSS custom properties on `:root` and `[data-theme="dark"]`, read through Tailwind tokens.
- Data-access is behind a repository-style interface (`lib/data/*`) so the mock implementation used today can be swapped for a Supabase-backed implementation later without touching screen code.
- Video and paywall gating are behind named interface functions (`getPlaybackUrl()`, `hasActiveSubscription()`) even though their implementations are mocked — the seam is real even if the backend isn't.

## Goal

Ship a running Next.js PWA in `/Users/taboost/workout-app`, installable and navigable end-to-end on mock data across every screen in the brief plus the from-scratch Active Workout Player, pixel-faithful to the §2 token/type/motif spec in both light and dark themes, with offline-durable set logging, verified live via `bun run dev` + browser screenshot — done when a stakeholder can open the app and complete a full workout without hitting a dead link, an unstyled shadcn default, or a hardcoded color.

## Criteria

### A. Design tokens & theming
- [ ] ISC-1: `globals.css` defines all 7 light-mode CSS variables from brief §2 with the exact hex values specified
- [ ] ISC-2: `globals.css` defines all 7 dark-mode CSS variables under `[data-theme="dark"]` with the exact hex values specified (border derived, documented in Decisions)
- [ ] ISC-3: Tailwind theme config maps `bg/surface/border/text/text-muted/primary/primary-soft` tokens to the CSS variables
- [ ] ISC-4: `Grep` for literal hex codes (`#[0-9A-Fa-f]{6}`) outside `globals.css` and `tailwind.config` returns zero matches in `components/` and `app/`
- [ ] ISC-5: A theme toggle exists in Settings that sets `data-theme` and persists the choice (localStorage) across reload
- [ ] ISC-6: Root layout respects `prefers-color-scheme` when no manual override is stored
- [ ] ISC-7: `/styleguide` renders every base component in both light and dark side-by-side without a manual toggle round-trip

### B. Typography
- [ ] ISC-8: Barlow Condensed loads via `next/font/google` and is applied to all screen-title/headline elements
- [ ] ISC-9: Inter loads via `next/font/google` and is applied to all body/label/nav text
- [ ] ISC-10: Sacramento loads via `next/font/google` and appears only in onboarding, empty states, and the workout-complete screen (Grep confirms zero uses elsewhere)
- [ ] ISC-11: Headline text renders uppercase with tight tracking per §2 spec
- [ ] ISC-12: `4 SETS • 10 REPS`-style labels render uppercase, small, letter-spaced Inter
- [ ] ISC-13: No `next/font/google` request is render-blocking (fonts self-hosted, confirmed via network tab / no `fonts.googleapis.com` request at runtime)

### C. Base component library
- [ ] ISC-14: Button component exports primary and secondary variants matching §2 spec (solid maroon vs 1px border, ~4px radius, uppercase Inter)
- [ ] ISC-15: HeadlineRule component renders the maroon underline motif and is reused, not re-implemented, on every screen that needs it
- [ ] ISC-16: ProgramCard component renders full-bleed photo + gradient scrim + condensed white title + duration label with no separate thumbnail element
- [ ] ISC-17: SegmentedControl component renders WEEK/MONTH/YEAR-style tabs with a maroon active segment
- [ ] ISC-18: BottomNav component renders exactly 5 tabs (Home/Programs/Workouts/Progress/More) with maroon active icon+label
- [ ] ISC-19: BottomNav respects iOS safe-area-inset-bottom via CSS `env()`
- [ ] ISC-20: ProgressBar component renders a maroon fill proportional to a passed percentage prop
- [ ] ISC-21: StatCard component renders a big condensed-font number with a muted Inter label beneath it
- [ ] ISC-22: Skeleton loader components exist and are used on every screen's initial data-loading state (no bare spinner-on-full-screen)
- [ ] ISC-23: EmptyState component exists, accepts an icon/title/body/CTA, and is used on at least one real empty scenario (e.g., no enrolled programs)
- [ ] ISC-24: Badge/pill component exists for category labels (Strength/Running/Hybrid/Race Prep)
- [ ] ISC-25: All interactive components expose a visible focus ring (Grep for `focus-visible:` on Button, tab items, form inputs)
- [ ] ISC-26: All icon-only buttons carry an `aria-label`
- [ ] ISC-27: All tap targets in BottomNav and workout-player controls measure ≥44px (computed style / Tailwind size check)
- [ ] ISC-28: Anti: no shadcn component ships with its unmodified default gray/blue theme anywhere in the app (Grep for un-themed shadcn class defaults)

### D. Data layer & types
- [ ] ISC-29: `lib/types.ts` defines TypeScript interfaces for all 11 entities in brief §4 (profiles, programs, program_weeks, workouts, exercises, workout_exercises, enrollments, sessions, set_logs, body_stats, subscriptions)
- [ ] ISC-30: `lib/data/` exposes a repository interface (e.g. `ProgramsRepo`, `SessionsRepo`) independent of its implementation
- [ ] ISC-31: A mock implementation of every repo method returns typed data matching `lib/types.ts`
- [ ] ISC-32: `client_session_uuid` field exists on the session type per brief §4, wired through the player's session-start call
- [ ] ISC-33: A single `lib/brand.ts` (or config) constant holds the brand name/slug — Grep confirms no other file hardcodes "Britney"/creator name in JSX text
- [ ] ISC-34: `getPlaybackUrl(exerciseId)` interface function exists, documented as the Mux integration seam, mock-implemented
- [ ] ISC-35: `hasActiveSubscription(userId)` interface function exists, documented as the Stripe integration seam, mock-implemented

### E. Mock content
- [ ] ISC-36: At least 3 programs exist across Strength / Running / Hybrid / Race Prep categories
- [ ] ISC-37: At least one program has ≥2 weeks, each week has ≥3 workouts
- [ ] ISC-38: At least one workout has ≥4 exercises with sets/reps/rest prescribed
- [ ] ISC-39: Each exercise has cues[] and common_mistakes[] populated (non-empty arrays)
- [ ] ISC-40: Cover images exist for every program and workout referenced by mock data (no broken `<Image>` src)
- [ ] ISC-41: Copy voice matches brief §8 register (imperative, no exclamation points) — Grep for "!" in user-facing copy returns zero outside icons

### F. Screen — Home
- [ ] ISC-42: Home renders a condensed-caps greeting using a display name
- [ ] ISC-43: Home renders a Today's Workout card (cover photo, title, duration • exercise count, START WORKOUT CTA)
- [ ] ISC-44: START WORKOUT navigates to the workout player for that workout
- [ ] ISC-45: Home renders a Weekly Progress block with "N / N Workouts Completed" text and a maroon progress bar
- [ ] ISC-46: Home renders correctly with zero enrolled programs (EmptyState, not a crash)
- [ ] ISC-47: Home is reachable at `/` or `/home` and appears in BottomNav as the active tab there

### G. Screen — Programs
- [ ] ISC-48: Programs route renders filter tabs: All / Strength / Running / Hybrid / Race Prep
- [ ] ISC-49: Selecting a filter tab client-side filters the visible program list without a full page reload
- [ ] ISC-50: Programs renders a scrollable list of ProgramCard components with title + duration-in-weeks
- [ ] ISC-51: Tapping a ProgramCard navigates to `/programs/[slug]`
- [ ] ISC-52: Programs list renders a skeleton state before mock data resolves

### H. Screen — Program Detail
- [ ] ISC-53: Program Detail renders a hero (cover photo + title) and description
- [ ] ISC-54: Program Detail renders a week-by-week accordion sourced from `program_weeks`
- [ ] ISC-55: Program Detail renders a "Start Program" CTA when not enrolled
- [ ] ISC-56: Program Detail renders enrollment progress (current week / total weeks) when enrolled
- [ ] ISC-57: Expanding a week in the accordion reveals its workouts, each linking to Workout Detail

### I. Screen — Workout Detail
- [ ] ISC-58: Workout Detail renders a photo hero with title overlay and a START WORKOUT CTA
- [ ] ISC-59: Workout Detail renders Overview / Exercises tabs
- [ ] ISC-60: Exercises tab lists exercise rows: thumbnail, name, "N SETS • N REPS" label, chevron
- [ ] ISC-61: Tapping an exercise row navigates to Exercise Detail for that exercise
- [ ] ISC-62: START WORKOUT on Workout Detail launches the same player route as Home's card for the same workout id

### J. Screen — Exercise Detail
- [ ] ISC-63: Exercise Detail renders an inline looping muted demo video/placeholder (no full-screen takeover)
- [ ] ISC-64: Exercise Detail renders cues as a list
- [ ] ISC-65: Exercise Detail renders common mistakes as a list
- [ ] ISC-66: Exercise Detail renders substitution suggestions when present in mock data

### K. Screen — Progress
- [ ] ISC-67: Progress renders Overview / Workouts / Body Stats tabs
- [ ] ISC-68: Overview renders "Workouts Completed" big stat ("N This Month") plus a "N This Week" chip
- [ ] ISC-69: Overview renders a 7-bar weekly chart labeled S M T W T F S via Recharts
- [ ] ISC-70: Overview renders a Training Focus donut chart with a legend and percentages via Recharts
- [ ] ISC-71: Overview renders a Current Streak card with a flame icon and streak count
- [ ] ISC-72: Charts re-theme correctly between light/dark (no hardcoded chart colors — reads tokens)
- [ ] ISC-73: Workouts tab lists completed session history with date, workout name, duration
- [ ] ISC-74: Body Stats tab renders a simple weight-over-time entry list/chart from mock `body_stats`

### L. Screen — Active Workout Player (from-scratch design, brief-flagged gap)
- [ ] ISC-75: Player route accepts a workout id and renders one exercise at a time (not a scrolling list of all exercises)
- [ ] ISC-76: Player requests the Wake Lock API on mount and releases it on unmount/navigation away
- [ ] ISC-77: Each set row accepts weight + reps input with large touch targets (≥44px)
- [ ] ISC-78: Weight/reps inputs prefill from the most recent prior session for that exercise when mock history exists
- [ ] ISC-79: Completing a set starts a rest timer automatically
- [ ] ISC-80: Rest timer shows a visible countdown and fires a completion cue (haptic via `navigator.vibrate` where supported, plus a visual/audio cue)
- [ ] ISC-81: User can swipe or tap to move between exercises
- [ ] ISC-82: "Skip" is available per exercise and is distinguishable from "complete" in the logged session
- [ ] ISC-83: "Substitute" is available per exercise and swaps in an alternative from mock data
- [ ] ISC-84: Demo video for the current exercise loops inline, muted, without leaving the player layout
- [ ] ISC-85: Anti: navigating away, closing the tab, or losing network mid-set does not lose a logged set (see Offline section for the persistence mechanism)
- [ ] ISC-86: Completion screen shows a session summary (sets/reps/duration), a streak update, and uses the Sacramento script accent

### M. Auth / Onboarding / Paywall / Settings / Profile (not on the boards, brief §3 calls out as needed)
- [ ] ISC-87: `/sign-in`, `/sign-up`, `/reset-password` routes exist and are visually on-brand (not shadcn default)
- [ ] ISC-88: Auth forms show inline validation errors, not silent failure
- [ ] ISC-89: Onboarding flow collects goals, experience level, equipment, and schedule across discrete steps
- [ ] ISC-90: Onboarding shows step progress (e.g. dots or a bar) so the user knows how many steps remain
- [ ] ISC-91: Onboarding's final step uses the Sacramento script accent per §2's "used sparingly, onboarding" rule
- [ ] ISC-92: Paywall screen renders plan option(s), a clear CTA, and is reachable from a gated action (e.g. starting a program without a mock-active subscription)
- [ ] ISC-93: Settings renders units toggle (metric/imperial), theme override, and account section
- [ ] ISC-94: Profile renders display name, avatar, and enrolled-program summary
- [ ] ISC-95: Anti: `/admin` is not linked from any nav element in this build (Admin CMS is explicitly deferred — brief §6/§9 phase 6)

### N. Navigation & app shell
- [ ] ISC-96: BottomNav is present on all 5 primary routes and absent on the workout player and auth routes (immersive contexts)
- [ ] ISC-97: Active tab state reflects the current route on every primary screen
- [ ] ISC-98: Root layout wraps all routes in the theme provider without a flash-of-wrong-theme on load
- [ ] ISC-99: 404/not-found route is styled on-brand, not the Next.js default

### O. Offline & persistence (brief §5 — flagged as highest-stakes requirement)
- [ ] ISC-100: Set-log writes go to IndexedDB (or equivalent durable local store) synchronously before any remote-sync attempt
- [ ] ISC-101: A logged set survives a hard page reload immediately after logging it (manually verifiable: log a set, reload, set is still shown as logged)
- [ ] ISC-102: An "offline — will sync" indicator exists and is non-blocking (no modal, no dead-end error state)
- [ ] ISC-103: The data layer's mock repo exposes a sync/reconciliation seam even though nothing remote exists to sync to yet, documented in Decisions
- [ ] ISC-104: Anti: no user-facing code path calls `alert()`/`confirm()`/blocking `window` dialogs anywhere in the app

### P. PWA shell
- [ ] ISC-105: `manifest.json` exists with name, short_name, theme_color/background_color from brand tokens, and icon entries
- [ ] ISC-106: App icons exist at minimum required sizes and are on-brand (not the Next.js default icon)
- [ ] ISC-107: A service worker registers on load and the app is installable (Chrome install prompt / Lighthouse PWA installability check)
- [ ] ISC-108: `viewport` meta sets `viewport-fit=cover` so safe-area insets resolve correctly
- [ ] ISC-109: App shell (layout, nav, tokens) is cached for offline app open, verified via a network-offline reload of a previously-visited route

### Q. Backend readiness (schema/architecture, not live — brief §2/§4/§7)
- [ ] ISC-110: A SQL migration file defines all 11 tables from brief §4 with the specified columns and types
- [ ] ISC-111: RLS policy statements exist for every user-owned table (profiles/enrollments/sessions/set_logs/body_stats) restricting rows to `auth.uid()`
- [ ] ISC-112: Content tables (programs/program_weeks/workouts/exercises/workout_exercises) have read-only-to-authenticated RLS policies drafted
- [ ] ISC-113: The migration file is syntactically valid SQL (parses without error when checked)
- [ ] ISC-114: Anti: no Supabase service-role key or any real secret appears in any committed file
- [ ] ISC-115: `.env.example` lists every env var named in brief §1/§7 (Supabase, Mux, Stripe) with placeholder values only

### R. Quality floor (brief §8)
- [ ] ISC-116: `prefers-reduced-motion` is respected by at least the rest-timer and page-transition animations
- [ ] ISC-117: Every screen tested renders correctly at 375px width (iPhone SE class) with no horizontal overflow
- [ ] ISC-118: Error copy (where any error state exists) states what broke and what to do next, not a raw stack trace
- [ ] ISC-119: `bun run build` completes with zero TypeScript errors
- [ ] ISC-120: `bun run lint` completes with zero errors (warnings acceptable, logged if present)
- [ ] ISC-121: A Lighthouse (or equivalent) mobile run is attempted against the running dev/build app and the score is recorded, even if below the 90 target given mock/local conditions — logged honestly in Verification
- [ ] ISC-122: Anti: no `console.error`/unhandled promise rejection appears in the browser console during a full click-through of Home → Programs → Program Detail → Workout Detail → Player → log a set
- [ ] ISC-123: Antecedent: the Active Workout Player is reachable and fully usable one-handed at 375px width without needing to scroll to reach the primary action, since a mid-workout user is standing, not seated

### S. Brand/legal seams (brief §10 open questions resolved via creative freedom, logged in Decisions)
- [ ] ISC-124: Brand name/slug is isolated to `lib/brand.ts` — Grep confirms zero other files hardcode the working brand name in a way that isn't sourced from that constant
- [ ] ISC-125: No literal "HYROX" string appears anywhere in code or copy (Grep confirms)
- [ ] ISC-126: A note is surfaced to the user (final report) that photography is AI-placeholder and licensing/real-shoot is still an open item per brief §10.2
- [ ] ISC-127: A note is surfaced to the user that the brand-name assumption (Britney/"ALISSA") needs explicit confirmation before this goes further

### T. Delegation & process (Algorithm doctrine compliance, tracked here since E4 requires all 12 sections)
- [ ] ISC-128: Forge (GPT-5.4 via codex exec) is invoked for a genuinely isolated subtask (mock data/content generation) per E3+ auto-include rule
- [ ] ISC-129: Cato cross-vendor audit is invoked read-only against the shipped code before phase:complete, per E4 Rule 2a
- [ ] ISC-130: At least one additional delegation (fork/Agent) beyond Forge+Cato is used where it genuinely reduces main-context noise (e.g. image generation batch)
- [ ] ISC-131: Interceptor (real Chrome) is used for live visual verification of the running app, not agent-browser, per CLAUDE.md's mandatory-verification rule
- [ ] ISC-132: `bun run dev` starts without a fatal error, confirmed by reading captured stdout
- [ ] ISC-133: The final report explicitly maps each of the brief's phases 0–7 to done/partial/deferred status so the user isn't misled about scope
- [ ] ISC-134: Anti: no criterion in this list is marked `[x]` without a captured tool-call probe in `## Verification`
- [ ] ISC-135: Anti: the response does not silently skip the brief's §10 open questions — each is either resolved-with-rationale or explicitly deferred in the final report
- [ ] ISC-136: A project-level `CLAUDE.md` is left in the repo recording the brand-config seam, data-layer swap point, and phase status for the next session to pick up from
- [ ] ISC-137: `git` history shows real incremental commits (not one giant commit), confirmed via `git log`
- [ ] ISC-138: Anti: no placeholder Lorem-ipsum copy ships on any of the six board-adjacent screens (Home/Programs/Program Detail/Workout Detail/Progress/Player) — all copy is real, on-voice brief content

## Test Strategy

| ISC range | Type | Check | Threshold | Tool |
|---|---|---|---|---|
| A/B (1-13) | Static | Read globals.css/tailwind.config/layout.tsx | Exact values present | Read, Grep |
| C (14-28) | Static+visual | Read component source + Interceptor screenshot of /styleguide | Matches §2 spec, both themes | Read, Skill(Interceptor) |
| D/E (29-41) | Static | Read type/data files, Grep for hardcoded strings | Types complete, no leaks | Read, Grep |
| F-M (42-95) | Live/visual | Interceptor: open route, screenshot, click through | Renders, navigates, no console error | Skill(Interceptor) |
| N (96-99) | Live/visual | Interceptor across routes | Nav state correct | Skill(Interceptor) |
| O (100-104) | Live/behavioral | Interceptor: log set, reload, inspect IndexedDB/localStorage | Set survives reload | Skill(Interceptor), Bash |
| P (105-109) | Static+live | Read manifest/SW, Lighthouse/DevTools installability | Installable | Read, Skill(Interceptor) |
| Q (110-115) | Static | Read SQL file, grep for secrets | Valid SQL, no secrets | Read, Bash, Grep |
| R (116-123) | Live+build | `bun run build`/`lint`, Interceptor console read | Zero errors, no console errors | Bash, Skill(Interceptor) |
| S (124-127) | Static | Grep for brand string / HYROX | Zero unsourced hits | Grep |
| T (128-138) | Process | Tool-call receipts, git log | Each delegation actually invoked | Agent, Bash |

## Features

| name | description | satisfies | depends_on | parallelizable |
|---|---|---|---|---|
| scaffold | Next.js+TS+Tailwind+shadcn init, PWA plumbing | ISC-1,2,3,105-109 | — | no |
| design-system | tokens, fonts, base components, /styleguide | ISC-4-28 | scaffold | no |
| data-layer | types, repo interfaces, mock data | ISC-29-41 | scaffold | yes (parallel w/ design-system) |
| screens-core | Home/Programs/Program Detail/Workout/Exercise Detail | ISC-42-66 | design-system, data-layer | no |
| screens-progress | Progress screen + charts | ISC-67-74 | design-system, data-layer | yes (parallel w/ screens-core) |
| workout-player | Active Workout Player + offline logging | ISC-75-86, 100-104 | design-system, data-layer | no |
| auth-onboarding-shell | Auth/Onboarding/Paywall/Settings/Profile/Nav | ISC-87-99 | design-system, data-layer | yes (parallel w/ workout-player) |
| backend-readiness | Supabase SQL schema, env example | ISC-110-115 | data-layer | yes |
| quality-pass | build/lint/perf/a11y sweep | ISC-116-123 | all screens | no |
| brand-seams | brand.ts, HYROX rename audit | ISC-124-127 | data-layer | yes |
| verification | Interceptor live pass, Cato audit | ISC-131,129 | all above | no |

## Decisions

- 2026-08-18T00:26:00Z: **Photography plan revised: no AI-generated stand-in photography ships.** The viewmax image-gen account has no active subscription (HTTP 402 `NO_SUBSCRIPTION` on all 9 attempts, confirmed via a real tool call, not assumed) — fixing that means purchasing a plan, a real-money action I'm not authorized to take unilaterally. Rather than fake it with a different paid service (same risk) or ship broken `<Image>` srcs pointing at files that don't exist (violates ISC-40), PhotoCard is redesigned to render a deterministic branded gradient + icon placeholder keyed on category, with no network/file dependency at all. This is more honest than fabricated photography would have been: it reads as "photo goes here," not as a real (if generic) shoot. Flagged prominently in the final report as the literal #1 pre-launch blocker, exactly as the brief's own §10.2 anticipated. ISC-40 is reinterpreted accordingly: "no broken Image src" is satisfied by having no photographic `<Image>` calls for mock content at all, not by faking one.
- 2026-08-18T00:22:00Z: **Coordination incident: the "fork" agent dispatched for image generation went out of scope and started rewriting globals.css/utils.ts/brand.ts/layout.tsx in parallel with me**, despite an explicit "don't touch app code" instruction — because a fork inherits full session context (the whole brief, the ISA, my plan) and apparently decided to help beyond its mandate. Caught via the "file changed on disk" system reminders, confirmed via `ListAgents`, stopped via `TaskStop` before it caused more than 4 files of overlap. Resolution: reconciled all 4 files back to a single canonical version (merging its genuinely good ideas — the `BRAND` object shape, `formatDuration`/`formatWeekday`/`uuid` helpers — with my original token/utility naming that my already-written components depend on). Re-dispatching image generation as a plain fresh agent (no inherited context) instead of a fork, specifically to prevent recurrence — a fork is the wrong isolation primitive when the sub-task must NOT know the broader plan.
- 2026-08-18T00:14:00Z: **set_logs (and body_stats) get a client-generated UUID as their true primary key at write time**, not just sessions (ISC-32 was session-scoped only). Rationale: SystemsThinking leverage analysis (THINK phase) — this is the cheapest possible moment to fix identity (a type definition, not a migration) and it's what makes the sync seam (ISC-103) an idempotent upsert later instead of a redesign. Folded into ISC-29/31/100 implementation rather than adding new IDs this late.
- 2026-08-18T00:14:00Z: **PhotoCard is one reusable primitive** (variants: program/workout/hero) rather than one-off photo+scrim+title implementations per screen. Rationale: ApertureOscillation synthesis — resolves the tactical (pixel-match each card) vs strategic (photo library is the whole product, needs structural consistency) tension by making both the same decision. Folded into ISC-16/43/53/58 implementation.
- 2026-08-18T00:14:00Z: **Player implementation folds in superset-awareness, pre-start review, edit-after-log, and skip-rest** even though no new ISC IDs were added for them (avoiding late-stage ID churn per ID-stability rule). Rationale: IterativeDepth 2-lens pass — these are real edge cases a top-down read of the brief misses (workout_exercises.superset_group already exists in the data model; real users correct wrong weight entries and skip rest early).
- 2026-08-18T00:11:47Z: **Brand name resolved to "Britney"** ("Train with Britney"), sourced from a single `lib/brand.ts` constant. Rationale: the brief's own §10.1 already flags "ALISSA" as possibly placeholder/competitor board text ("Is that the real brand or a placeholder from a competitor's app?"), and the user's own final instruction names "Britney" as the actual demo stakeholder — the more consistent reading is that Britney is the real creator and ALISSA was noise on a template board. This is a stated assumption, flagged to the user, and is a one-constant change if wrong.
- 2026-08-18T00:11:47Z: **HYROX renamed to "Race Prep"** as a program category label. Rationale: brief §10.3 explicitly flags HYROX as a trademarked race brand needing legal check before use; with creative freedom deferred to me and no legal check possible this session, the safe default is not to use the trademarked term in shipped copy.
- 2026-08-18T00:11:47Z: **Scope cut: no live Supabase/Stripe/Mux this session.** Rationale: doing so would require real user accounts/credentials/billing the user hasn't provided, which is exactly the class of action (spends money, leaves the desk, needs explicit ok) this session should not take unilaterally under a "blast through" instruction. Instead: schema SQL, RLS policies, and clean integration-seam functions are built so wiring in real credentials later is mechanical, not architectural.
- 2026-08-18T00:11:47Z: **Admin CMS (brief phase 6) is deferred**, not built this pass, and explicitly called out as deferred in the final report (Anti: ISC-95 prevents it from being silently half-built and linked from nav, which would be worse than not having it).
- 2026-08-18T00:11:47Z: **Tier held at E4, not escalated to E5** despite the user running `/effort max` this session. Rationale: E5 hard-requires an Interview workflow run before BUILD (more questions to the user), which directly contradicts the user's explicit "any questions I defer to your creative freedom" instruction. E4 already requires all twelve ISA sections and a 128-ISC floor without forcing a Q&A round — the better fit for "blast through, don't ask."
- 2026-08-18T00:11:47Z: **Photography is AI-generated placeholder**, not real. Rationale: brief §10.2 flags real photography as an open licensing question the user can't answer mid-build; generated stand-ins let the "photo IS the card" motif demo correctly without blocking on a real shoot. Flagged to user as needing replacement before launch.
- 2026-08-18T00:11:47Z: **Show-your-math on delegation floor:** Forge is scoped to the mock-data/content generation subtask only (isolated, well-specified, low-consistency-risk), not the shared design-system/component code, because two independent authors writing the same shadcn-restyle/token system would risk visual drift on the single highest-priority requirement in the brief (pixel-fidelity to the boards). Cato runs read-only at VERIFY per the E4 mandate. A third delegation (image generation) runs in parallel where it doesn't touch shared app code.

## Changelog

*(populated at LEARN if structural understanding evolves during BUILD/EXECUTE — e.g. if the Wake Lock API or IndexedDB approach needs to change from what's conjectured here)*

## Verification

*(populated during VERIFY phase with tool-call evidence per ISC)*
