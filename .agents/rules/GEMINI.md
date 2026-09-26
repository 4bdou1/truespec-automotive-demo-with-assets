# Workspace Rules

## Git: Auto-commit and push after every task

After completing **any** code change task, always:

1. Stage all modified files: `git -C "truespec-automotive-demo" add -A`
2. Commit with a concise, descriptive message: `git -C "truespec-automotive-demo" commit -m "<type>: <summary>"`
3. Push to remote: `git -C "truespec-automotive-demo" push`

Run all three steps automatically — do **not** ask for confirmation. This applies to every task, no exceptions.

Use conventional commit prefixes where appropriate: `feat:`, `fix:`, `redesign:`, `refactor:`, `chore:`, `docs:`.
