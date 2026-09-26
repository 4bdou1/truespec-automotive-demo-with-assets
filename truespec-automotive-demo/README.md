# TrueSpec Automotive — frontend demo

A premium showroom + admin-demo frontend for TrueSpec Automotive, a Nigerian vehicle-import
business. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

This is a **frontend-only audition demo**. There is no real backend, database, authentication,
or file storage — see [Demo-only behavior](#demo-only-behavior) below.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The public showroom is the default route; the admin demo lives at
`/admin` — sign in with:

- **Username:** `admin`
- **Password:** `truespec-demo`

## Verification

```bash
npm run lint       # ESLint (flat config)
npm run typecheck   # next typegen + tsc --noEmit
npm run build        # production build (Turbopack)
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero, status navigation, featured vehicles |
| `/inventory` | Full inventory with search, make, price, and status filters (shareable via URL) |
| `/inventory/[slug]` | Vehicle detail — gallery, specs, features, WhatsApp CTA |
| `/admin` | Admin sign-in (demo only) |
| `/admin/overview` | Metrics + recent activity |
| `/admin/inventory` | Inventory table/cards with edit and delete |
| `/admin/inventory/new` | Create listing |
| `/admin/inventory/[id]` | Edit listing |
| `/admin/settings` | WhatsApp number, tagline, default full-tank cost |

## Demo-only behavior

Read this before treating anything here as production-ready:

- **Admin login is not secure.** It's a client-side gate (`lib/admin/auth-context.tsx`) backed
  by `localStorage`, meant only to demonstrate the admin UI. It performs no server-side
  authentication, has no password hashing, and has no session/CSRF protection.
- **Admin writes are local to your browser.** `lib/api/admin.ts` holds listings, settings, and
  the audit log in memory + `localStorage`. Edits made in the admin demo do **not** update the
  public site's data (which reads from the static seed in `lib/data/vehicles.ts`) and do not
  sync across devices or browsers. Clearing site data resets the demo.
- **Photo upload is local-only.** `PhotoUploader` reads files as data URLs in the browser; there
  is no real upload, resize, or CDN storage.
- **Two vehicles are real, the rest are seeded demo data.** The Mercedes-Benz GLE listings
  (`amg-gle-green`, `amg-gle-black`) are Umar's supplied photos; everything else is fictional
  inventory (`isDemo: true`) included to exercise filtering, statuses, and the admin workflow.
  See `assets/umar/ASSET_MANIFEST.md` for what is/isn't confirmed about the real cars.
- **Unconfirmed fields read "to be confirmed."** Year, trim, price, mileage, and status for the
  two real vehicles are not fabricated — see each listing's `publicNote`.

## What a production build would change

- Replace `lib/api/public.ts` and `lib/api/admin.ts` mutator bodies with calls to a real VPS API
  (the function signatures already match the integration contract in
  `docs/execution-plan.md`), while keeping every component untouched.
- Add real authentication (Argon2/bcrypt password hash, HTTP-only session cookie, CSRF, login
  rate limiting) and a public/admin DTO boundary enforced server-side.
- Replace local data-URL photo previews with real upload, validation, resize, and CDN storage.
- Replace the placeholder WhatsApp number in `lib/data/settings.ts` with the client's confirmed
  number and message copy.

## Project structure

```
app/                  Routes (App Router)
  (site)/              Public showroom — shares a layout with header/footer
  admin/               Admin demo, gated by lib/admin/auth-context
components/
  public/              Showroom UI
  admin/               Admin UI
  ui/                  Shared primitives (Button, Badge, Skeleton, icons, …)
lib/
  types/               Separate PublicVehicle / AdminVehicle types
  data/                 Seeded inventory, settings, audit log
  api/                  Mock repository layer (public.ts, admin.ts, adapters.ts)
  admin/                Client-only auth + data contexts, localStorage store
  format/                Currency, mileage, finance (landed cost / profit), date helpers
```
