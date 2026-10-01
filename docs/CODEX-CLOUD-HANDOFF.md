# Codex Cloud handoff

Status: prepared for the owner's plan review. No cloud task has been submitted.

## Repository and contributions

Repository: <https://github.com/justcarlson/ai-for-good>.

- `ideas/codex`: text concepts and presentation opening in `docs/ideas-codex.md`.
- `ideas/opus`: motion concepts in `docs/ideas-opus.md`, request in `IDEATION.md`,
  and OpenRouter receipt in `docs/ideas-opus.receipt.json`.
- `main`: integrates both contributions for review.

The text worker ran through Codex CLI with ChatGPT subscription login. Its runtime
reported model `gpt-6-astra`. The motion worker used
`anthropic/claude-opus-5.5`. The host recorded these identities; the original
worker documents remain unchanged.

## Integration brief

Build a lightweight workshop home page and two demos. Prefer static HTML, CSS,
and JavaScript, with no runtime API dependency. Use the Field Notebook visual
direction in the Opus concept document. Keep the opening short and provide direct
demo links. No employer branding.

1. Integrate the Opus-authored Seed Courier animation. The motion code must come
   from Claude Opus 5.5. Do not replace it with OpenAI-generated motion code.
2. Build Make it clearer using the fictional notice, prepared output, source
   mappings, and acceptance criteria in the Codex concept document.
3. Include prompt and model details in a compact How it was made view.
4. Provide reset, replay, keyboard controls, readable contrast, reduced motion,
   and an offline copy. Clearly identify prepared outputs and local interactions.
5. Add a FAL clip only if an approved credential path and a pre-call price check
   fit the task budget. Otherwise omit generated video and label any recorded
   animation as code animation.
6. Request Opus 5.5 or Sonnet 5.5 design review of the built result, apply needed
   fixes, then verify in a fresh browser at desktop and mobile sizes.

The total paid model budget is $0.50 for the entire workshop task, not per worker.
The monthly cap is $5 in UTC. Query the main session's current spend ledger before
any further paid call. OpenAI work uses ChatGPT subscription authentication.

## Cloud setup

Connect this public repository to a Codex Cloud environment using the owner's
subscription. Confirm its repository mapping before submitting an integration
task. Do not reuse an unrelated environment or call local execution a cloud run.
The CLI currently requires an environment ID for `codex cloud exec`.

Push reviewed worker commits before submitting the task. Record the cloud task
URL and resulting commit here when available. No environment ID is verified yet.

## Publication checks

The proposed address is `good.justcarlson.com`; it is not live yet. Use the owner's
existing Vercel account and the correct Cloudflare zone. Keep a working public
deployment URL if custom DNS is delayed. Do not modify the existing main website.

Verify the public site needs no login. Run the demos, check console errors and
links, and test the local copy offline. Save the Anthropic review with its exact
model and scope. The private Tailplan is kept outside this public repository.
