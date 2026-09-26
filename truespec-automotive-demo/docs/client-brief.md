# TrueSpec Automotive — normalized brief

## Product

A two-sided inventory website for a Nigerian vehicle import business:

1. Public showroom, available without login.
2. Private owner dashboard with inventory management and sensitive financial data.

## Roles

- Public visitor: read-only access to public listing information.
- Admin: one owner account with CRUD, costs, profit, settings, and audit history.

## Inventory states

- Available
- On Order
- Landed this year

## Public listing fields

- Brand, model, trim, year
- Exterior/interior color
- Mileage
- Features/options
- Multiple photos
- Status
- Customer-facing doorstep price
- Optional public note / expected arrival

## Private listing fields

- Purchase price
- US inland trucking
- Shipping
- Clearing
- Nigerian inland trucking
- Full-tank cost, default ₦110,000 and editable
- Computed landed cost
- Computed profit
- Internal notes / sourcing contact

## Public experience

- Hero with logo, tagline, and WhatsApp CTA
- Three inventory sections/filters
- Vehicle cards and detailed gallery view
- Per-vehicle WhatsApp deep link with a pre-filled message
- True responsive layouts for mobile and desktop
- Dark graphite showroom aesthetic, warm gold primary accent, WhatsApp green CTA
- Condensed industrial headings and clean sans-serif body type

## Admin experience

- Secure login
- Listing CRUD
- Multi-photo upload with compression/resizing
- Live cost/profit calculations
- Summary metrics: count, total landed cost, projected profit
- Settings: WhatsApp number, tagline, default full-tank cost
- Timestamped action logs

## Security acceptance criteria

- No private field can be retrieved from a public endpoint.
- Every admin route and endpoint performs server-side authentication.
- Passwords are hashed with Argon2 or bcrypt.
- Login attempts are rate-limited.
- Inputs are validated and sanitized server-side.
- Public responses use explicit allow-list serializers.
- Audit logs record create/edit/delete actions.

## Risk tests

- Public endpoints never return financial/private fields, including under direct or malformed requests.
- Unauthenticated admin requests return 401/403.
- Rapid duplicate writes do not create duplicate records.
- Large image batches do not corrupt or duplicate uploads.
- Test in a real desktop browser and a real mobile browser.
