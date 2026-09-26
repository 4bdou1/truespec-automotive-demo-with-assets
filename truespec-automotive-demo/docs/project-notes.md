# TrueSpec Automotive — client workspace

## Status

New lead. The client is running an unpaid demo audition among several developers.

## Recommended strategy

Win on visible product quality without giving away the production system:

- Demo: polished, responsive frontend with realistic seeded inventory and a clickable admin experience.
- Do not build the real database, authentication, upload pipeline, or VPS deployment before selection/payment.
- Make the demo integration-ready through typed frontend models and a small API adapter layer.
- Clearly label admin demo data as fictional and do not imply that mock authentication is secure.

## Proposed architecture after approval

- Frontend: Next.js + TypeScript + Tailwind CSS + Motion.
- Backend: FastAPI or Fastify on a VPS.
- Database: PostgreSQL.
- Authentication: one admin account, Argon2 password hash, secure HTTP-only session cookie, CSRF protection, login rate limiting.
- Images: VPS volume served through the reverse proxy, with resize/compression jobs and off-server backups. Move to S3-compatible storage later only if needed.
- Reverse proxy/TLS: Caddy.
- Deployment: Docker Compose.

## Critical security boundary

Use separate public and admin response models. The public API must construct responses from an explicit allow-list. It must never fetch and serialize the complete internal vehicle record and then remove financial fields.

Public fields: brand, model, trim, year, colors, mileage, features, photos, status, customer price, optional public note.

Private fields: purchase price, all trucking/shipping/clearing costs, full-tank cost, landed cost, profit, internal notes, sourcing contacts, audit records.

## Commercial recommendation

- Demo turnaround: 2–3 days.
- Production build anchor: USD 3,500.
- Ongoing maintenance anchor: USD 200/month, hosting and paid third-party services excluded.
- Suggested payment: 50% to start, 30% on staging approval, 20% at launch.
- Include two revision rounds; scope changes are quoted separately.

Adjust the rate if the portfolio positioning or client's budget signals justify it, but do not quote the full build as a cheap template site: secure admin, uploads, audit logs, responsive QA, deployment, and documentation make it a real custom application.

## Files

- `client-brief.md`: normalized requirements from the supplied PDF.
- `claude-frontend-prompt.md`: self-contained prompt for Claude Code.
- `execution-plan.md`: staged demo and production workflow.
- `client-reply.md`: ready-to-send WhatsApp reply; add portfolio links before sending.
