@AGENTS.md

# Train with Britney — Project Notes

Rough-draft demo built in one session against a written design-boards brief.
Full ideal-state articulation, decisions, and open questions: `ISA.md` (read
this first — it has the real history, including two mid-build bugs caught
and fixed via live browser verification).

## Status at a glance

- **Live/working:** design system + tokens (`app/globals.css`), all base
  components (`components/ui/`), every board screen plus the from-scratch
  Active Workout Player, auth/onboarding/paywall/settings UI, offline-first
  set logging (IndexedDB, survives reload), PWA shell (manifest/icons/SW).
- **Schema-ready but not live:** Supabase (`supabase/migrations/0001_init.sql`
  has the full RLS-protected schema; nothing is deployed — no project,
  no live auth).
- **Mocked on purpose:** `lib/data/subscription.ts` and `lib/data/playback.ts`
  are the Stripe/Mux integration seams — real interfaces, fake bodies.
- **Deliberately not built:** Admin CMS UI (schema supports it; no `/admin`
  route exists — see ISA `Out of Scope`).

## Key seams (swap points for real integrations)

- **Brand name:** `lib/brand.ts` — one object, `BRAND.name` etc. Currently
  assumes "Britney" as the real creator name; this is a stated assumption
  in `ISA.md`, not a confirmed fact.
- **Mock data → Supabase:** `lib/data/repo.ts` is the only place screens
  read data through. Swap its function bodies to Supabase queries; screen
  code doesn't change.
- **Offline sync:** `lib/data/offline-store.ts`'s `syncSetLogs()` is a
  no-op today. `set_logs.id` is already the client-generated UUID
  (`crypto.randomUUID()` at write time), so the real implementation is an
  `upsert ... on conflict (id)` — no data-model change needed.
- **Photography:** every "photo" is a gradient + icon placeholder
  (`components/ui/photo-placeholder.tsx`), keyed on `category`, not a real
  image file. No AI-generated stand-ins exist either (the image-gen
  account had no active subscription this session). Swap in real photos by
  changing `PhotoCard`/`PhotoPlaceholder` to render `next/image` once real
  assets and licensing exist.

## Known limitations (found via adversarial review, not fixed)

- **Multi-tab race on the offline session pointer.** Two tabs open on the
  same workout at once will race on `lib/data/session-pointer.ts`; the
  losing tab's locally-logged sets become invisible (not deleted, just
  orphaned under an untracked session id). Fine for a single-user demo;
  needs a `storage` event listener + merge before this is a real product.

## Conventions

- bun only, never npm/npx.
- Tailwind v4, CSS-first config in `app/globals.css` (`@theme inline`) — no
  `tailwind.config.js`.
- No hardcoded hex in component code — every color traces to a token.
- Next.js 16: dynamic route `params` are `Promise`-typed and must be
  `await`ed (see any `app/**/[slug]/page.tsx`).
