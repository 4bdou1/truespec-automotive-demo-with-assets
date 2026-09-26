# TrueSpec Automotive — execution plan

## Phase 0 — inputs

Request:

- Logo as SVG or high-resolution transparent PNG
- Instagram/page link and existing brand references
- WhatsApp number and preferred pre-filled message
- 6–10 representative vehicles with photos and public data, or permission to use clearly fictional demo inventory
- Currency/number formatting preference
- Portfolio links to include in the pitch

## Phase 1 — unpaid audition demo (strictly capped)

### Deliverable

A hosted frontend prototype with:

- High-impact desktop home/showroom
- Purpose-built mobile experience
- Available / On Order / Landed filtering
- Search and useful filters
- Vehicle detail page or modal with gallery
- Listing-specific WhatsApp CTA
- Clickable admin overview, inventory table, listing form, cost calculator, and settings screens
- Realistic sample data and loading/empty/error states

### Explicitly excluded

- Real authentication
- Production API/database
- Real image upload/storage
- VPS configuration
- Final QA, audit logging, backups, monitoring

### Demo schedule

Day 1:
- Establish visual direction, tokens, typography, shell, navigation, mock data, and flagship home screen.

Day 2:
- Build inventory browsing, vehicle detail, mobile reflow, WhatsApp flows, and polished motion.

Day 3:
- Build admin showcase, responsive QA, accessibility pass, performance pass, and deployment.

### Demo acceptance checklist

- No generic template feel.
- No stock dashboard look on the public site.
- Strong first viewport and vehicle photography.
- Mobile navigation and cards are designed, not merely scaled down.
- Every CTA works.
- No dead links or broken states.
- Lighthouse targets: performance 90+, accessibility 95+ where practical with demo assets.
- Test at 390px, 768px, 1440px, and a real phone.

## Phase 2 — paid production build

1. Freeze approved design and content model.
2. Define public/admin OpenAPI contract.
3. Build PostgreSQL schema and migrations.
4. Build single-admin auth and secure sessions.
5. Build explicit public DTO/serializer allow-list.
6. Build protected admin CRUD and optimistic concurrency/idempotency.
7. Build upload validation, resize/compression, ordering, and deletion.
8. Add audit log and settings.
9. Connect frontend to API.
10. Add risk-focused automated tests.
11. Deploy to staging VPS with Docker Compose and TLS.
12. Client acceptance testing.
13. Production launch, backups, monitoring, and handover.

## Integration contract to preserve during demo

Keep UI data access behind functions such as:

- `getPublicListings(filters)`
- `getPublicListing(slug)`
- `getAdminSummary()`
- `getAdminListings()`
- `createListing(input)`
- `updateListing(id, input)`
- `deleteListing(id)`
- `uploadListingPhotos(id, files)`
- `getSettings()` / `updateSettings(input)`

During the demo these functions return mock data. During production they call the VPS API, minimizing frontend rework.
