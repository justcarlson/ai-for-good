# Workshop demo instructions

Build small, polished demos that work from a browser. Keep copy brief and plain.
Do not include employer branding. Use original artwork and fictional data.

At most two independent workers may run, each in its own Git worktree with a
distinct assignment. The main Codex session integrates and verifies their work.

For workshop expansion, Opus 5.5 or Sonnet 5.5 owns concept selection, copy, and
the first design pass. Codex implements their direction, critiques it, and owns
UAT. Do not substitute Codex-led ideation for the Anthropic creative pass.

The motion demo must be authored by Claude Opus 5.5. Final visual review must use
Claude Opus 5.5 or Sonnet 5.5. Preserve exact provider model IDs and generation
receipts; never relabel a model or claim an unperformed review.

Use ChatGPT subscription authentication for OpenAI. Paid model work has a hard
$2.00 limit for this task (increased by the owner on 2026-10-01) and a $5 limit per UTC calendar month. Enforce limits
before calls. Do not buy credits or raise limits. Keep secrets outside Git and
client code. Use Infisical Shared/dev through the owner's approved workflow.

Every runnable demo needs a reset control, keyboard access, reduced-motion
support where relevant, and a usable prepared example. Label prepared model
outputs clearly. Do not simulate a live model response without disclosure.

Document build, preview, and verification commands when implementation begins.

## Shared preview server

The main session owns one preview server at `http://127.0.0.1:4173`, serving
`public/` from this repository. Every local delegate must reuse it. Do not start
another development, preview, HTTP, or build server, and do not stop this server.
Send changes to the main session for integration before checking the shared page.
Cloud delegates must use the supplied public preview URL or perform source/build
checks only. They must not start a duplicate server in their cloud environment.
