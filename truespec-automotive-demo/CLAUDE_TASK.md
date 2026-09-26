# Prompt for Claude Code — TrueSpec Automotive frontend demo

You are a senior product designer and frontend engineer. Build a genuinely premium, demo-ready frontend for **TrueSpec Automotive**, a Nigerian vehicle-import business. This is an audition demo: visible product quality, responsive behavior, and coherent interaction design matter more than backend breadth.

## Operating mode

1. First inspect the existing repository, package manager, scripts, and conventions. Preserve a sound existing setup rather than rewriting blindly.
2. If the repository is empty, create a production-quality **Next.js App Router + TypeScript + Tailwind CSS** app. Use the current stable packages already available in the environment. Add Framer Motion/Motion only where it materially improves the experience.
3. Before coding, write a short implementation plan and list the files you will create or change.
4. Then implement the complete frontend, run lint/typecheck/build, fix every error, and perform responsive browser QA if browser tooling exists.
5. Do not stop at a plan or static mockup. Deliver working code.

## Scope boundary

This demo is **frontend only**. Do not build a real production backend, real authentication, database, or storage service. Use realistic typed mock data and a small API adapter/repository layer so the mocks can later be replaced by calls to a VPS API without rewriting components.

The `/admin` route is a clickable product demonstration, not a security implementation. Make that clear in code/README. Never claim client-side mock authentication is secure.

## Product requirements

### Public showroom

- Premium home page with TrueSpec logo/wordmark area, concise tagline, strong vehicle-led hero, and prominent “Chat on WhatsApp” CTA.
- Inventory navigation for **Available**, **On Order**, and **Landed This Year**.
- Useful browsing controls: keyword search and concise filters such as make, year, and price. Do not clutter the interface.
- Vehicle cards displaying photo, brand/model/trim/year, colors, mileage, status, and doorstep price in Nigerian naira.
- Detail route or polished modal with a responsive multi-photo gallery, specifications, features, public note/arrival information, and a WhatsApp CTA pre-filled with that exact vehicle.
- Thoughtful loading skeleton, empty result, and error presentation even though the data is mocked.
- Every CTA and navigation element must work.

### Admin product demo

Create a coherent admin experience at `/admin` with:

- Login screen for presentation only.
- Overview metrics: inventory count, total landed cost, and projected profit.
- Inventory table/list with status, price, profit, edit action, and responsive mobile representation.
- Create/edit listing form with public fields and a visually separated “Private financials” section.
- Multi-photo upload UI demonstration with drag-and-drop styling, previews, ordering, and remove controls. It may operate locally in the browser for the demo.
- Live landed-cost and profit calculation as costs or customer price change.
- Settings screen for WhatsApp number, tagline, and default full-tank cost of ₦110,000.
- Small audit activity panel using mock events.

Use this formula:

`landed cost = purchase price + US inland trucking + shipping + clearing + Nigerian inland trucking + full-tank cost`

`projected profit = doorstep price - landed cost`

## Data model

Public fields:

- id, slug
- brand, model, trim, year
- exteriorColor, interiorColor
- mileage
- features
- photos
- status: `available | on-order | landed`
- doorstepPrice
- publicNote

Admin-only fields:

- purchasePrice
- usInlandTruckingCost
- shippingCost
- clearingCost
- nigeriaInlandTruckingCost
- fullTankCost
- landedCost
- projectedProfit
- internalNotes
- sourcingContact

Keep public and admin TypeScript response types separate. Public components must consume only the public type. Do not pass a complete admin object into public components and omit keys at render time.

## Visual direction

Aim for **editorial automotive showroom**, not “generic SaaS dashboard” and not a loud supercar gaming site.

- Background: deep graphite/near-black, with layered charcoal surfaces.
- Primary accent: restrained warm gold/champagne.
- WhatsApp CTA: recognizable green, used only for chat actions.
- Headings: condensed industrial display face such as Oswald.
- Body: Inter or a similarly clean sans serif.
- Large, crisp vehicle imagery with deliberate cropping.
- Use generous whitespace, strong hierarchy, fine borders, subtle grain/gradient, restrained shadows, and precise alignment.
- Motion should feel mechanical and premium: short reveals, image transitions, hover elevation, filter transitions. Respect `prefers-reduced-motion`.
- Avoid AI-template clichés: no giant meaningless gradient orb, no excessive glassmorphism, no fake testimonials, no random statistics, no over-rounded pill everywhere, no huge centered heading followed by three generic cards.
- The public website and admin dashboard should share the brand system while serving different jobs.

## Responsive behavior

Design mobile deliberately rather than shrinking desktop:

- Mobile-first tap targets of at least 44px.
- Compact sticky mobile header or sensible navigation.
- Vehicle cards recompose cleanly; do not squeeze desktop grids.
- Filter controls become a usable drawer/sheet or compact stack.
- Gallery supports touch-friendly navigation.
- Admin tables convert to cards or a readable horizontal strategy on narrow screens.
- Forms use one column on mobile and grouped columns on wide screens.
- Verify at approximately 390px, 768px, 1024px, and 1440px.

## Supplied brand and vehicle assets

Read `assets/umar/ASSET_MANIFEST.md` before building.

- Use `assets/umar/processed/logo/truespec-logo-white-transparent.png` on dark surfaces and the black transparent variant on light surfaces. Preserve the original supplied file under `assets/umar/raw/`.
- Vehicle 01 contains 30 real photos of a dark metallic green Mercedes-AMG GLE with a brown/black interior. It is the strongest detail-page and gallery asset.
- Vehicle 02 contains 5 real exterior photos of a black Mercedes-AMG GLE and works well as a featured card or hero image.
- Copy web-used files into the framework's public/static asset location with clean filenames; do not reference machine-specific absolute paths.
- The photos already include a TrueSpec watermark. Do not add another watermark.
- Umar has not yet supplied confirmed year, exact trim, price, status, or other listing details. Do not present inferred values as facts. Use “Details to be confirmed,” omit unknown fields, or treat extra values as clearly marked demo content.
- Do not claim mechanical condition, accident history, ownership history, or inspection results based on images.

## Content and mock inventory

- Build the strongest experience around the two supplied real vehicles.
- You may seed additional believable vehicles across all three statuses to demonstrate filtering and layout, but clearly isolate them as demo records in the data layer.
- Use realistic Nigerian naira formatting. Do not imply fictional prices came from Umar.
- Use high-quality remote images for fictional records only if the setup permits stable image domains; otherwise use bundled placeholders.
- Do not use manufacturer logos as if they belong to TrueSpec.
- Do not invent customer claims, awards, business statistics, or verified vehicle-history claims.

## Code quality

- Strict TypeScript; no `any` unless unavoidable and explained.
- Reusable components only where reuse is real; avoid premature abstraction.
- Centralize design tokens and mock data.
- Use semantic HTML, keyboard-accessible interactions, visible focus states, descriptive alt text, and sufficient contrast.
- Use `Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' })` or an equivalent correct formatter.
- Keep URL/filter state shareable where practical.
- No useless comments, dead code, broken imports, console errors, or nonfunctional controls.
- Do not expose secrets or create `.env` values that look like real credentials.

## Suggested organization

Adapt to the existing repository, but preserve these responsibilities:

- `app/` for routes and layouts
- `components/public/` for showroom UI
- `components/admin/` for admin UI
- `components/ui/` for genuinely shared primitives
- `lib/types/` for separate public/admin types
- `lib/data/` for seeded demo inventory
- `lib/api/` for mock adapter functions that will later call the VPS
- `lib/format/` for currency/mileage utilities

## Required final verification

Run the repository’s actual equivalents of:

- install
- lint
- typecheck
- production build

Fix all failures. If tests exist, run them. If browser automation is available, test the major public and admin flows at desktop and mobile widths and fix visible overflow, inaccessible controls, dead CTAs, and console errors.

At the end, report:

1. What you built.
2. Routes available.
3. Files/modules added or changed.
4. Commands run and their results.
5. Any temporary assets or mock-only behavior that must be replaced for production.
6. Exact local run command.

Do not build a merely acceptable template. The winning criterion is whether the first 30 seconds feel like a custom, trustworthy, high-end automotive product while the interface remains clear and practical for real inventory browsing.
