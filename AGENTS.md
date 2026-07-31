# Project Governance

- Run all implementation work on a task-owned `codex/` branch and worktree.
- Finish every implementation stage with an atomic commit before starting the next stage.
- Before each stage commit, the relevant tests, build, and manual surface validation must pass.
- In mixed or dirty worktrees, use explicit-path or hunk staging and preserve unrelated or user changes.
- Keep implementation and its direct tests together; keep independent docs, config, and generated artifacts in separate commits.
- Never commit failing or stale QA, debug artifacts, secrets, or credentials.
- Any fix commit invalidates prior exact-SHA review and QA; run fresh applicable gates before proceeding.
- When the user requests ship, final delivery requires push, a ready PR, checks and review, merge, remote and local branch deletion, and task-worktree cleanup.
