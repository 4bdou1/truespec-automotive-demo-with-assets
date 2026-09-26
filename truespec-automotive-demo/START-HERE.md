# Start here

## Workspace

This folder is the frontend demo repository.

- Main Claude prompt: `CLAUDE_TASK.md`
- Normalized requirements: `docs/client-brief.md`
- Execution strategy: `docs/execution-plan.md`
- Original client PDF: `docs/original-brief.pdf`

## One-time Claude login

```bash
claude auth login
```

Complete the browser login, then verify:

```bash
claude auth status --text
```

## Run Claude

After extracting the ZIP, open a terminal in the extracted `truespec-automotive-demo` directory and run:

```bash
claude
```

At the Claude prompt, enter:

```text
Read @CLAUDE_TASK.md and @docs/client-brief.md, then execute the task completely. Start by inspecting the repository and writing your short implementation plan, then build the frontend, run all checks, and fix every failure. Do not stop after planning.
```

Use Claude Opus/high effort if available. Allow file edits and normal development commands, but review any destructive command before approving it.

## Supplied client assets

Umar’s logo and 35 vehicle photos are already included under `assets/umar/`. Read `assets/umar/ASSET_MANIFEST.md` before building. The package includes prepared transparent black and white logo variants plus the untouched originals.

## Inputs still needed from the client

The build can begin now, but these listing facts must be confirmed before presenting or publishing:

- Year, exact model/trim, price, status, mileage, colors, and feature list for both supplied vehicles
- Final WhatsApp number
- Preferred WhatsApp pre-filled message
- Existing Instagram/brand references
- Original vector/SVG logo if available

## Demo scope

This repository is for the polished frontend audition only. It should use typed mock data and a replaceable API adapter. Do not add real authentication, database credentials, or production secrets here.
