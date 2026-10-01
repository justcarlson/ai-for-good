# Codex Cloud handoff

Later local releases added presenter URL state and the nonprofit AI Lab companion
after the Cloud snapshots below. Their exact scope and browser checks are in
[NONPROFIT-ALIGNMENT.md](NONPROFIT-ALIGNMENT.md) and
[VERIFICATION.md](VERIFICATION.md). They were not reviewed by the earlier Cloud
worker. The current public repository contains the complete implementation.

The public repository is [justcarlson/ai-for-good](https://github.com/justcarlson/ai-for-good).
The website and demos are implemented; Cloudflare Pages serves the static files.

## Cloud status

The expanded workshop is live at [good.justcarlson.com](https://good.justcarlson.com).
Its 13 activities passed the local checks recorded in [VERIFICATION.md](VERIFICATION.md).
The source commit is `a9985485e1de0df819863ab9e7fdeb7a8aed7c70`.

The [expansion handoff](https://chatgpt.com/codex/tasks/task_e_6abe4f5a91ac832aa53644bb01d08531)
received a compressed source snapshot, but its worker could not transfer the
large inline payload to a file. The fallback GitHub fetch also returned 403.
No expansion build or review ran in that task.

A [focused follow-up](https://chatgpt.com/codex/tasks/task_e_6abe50bf3a1c832a8e9c15789d7961ab)
reviewed eight expansion scripts as plain text. It covered the
menu, guides, routes, claim board, planner, data filters and audio. It does not
replace the local build or browser checks.

It found two defects, both corrected after review:

- Switching presenter mode reset the activity countdown. The toggle now preserves
  running and paused timers; selecting the active activity mode also preserves it.
- A rejected earlier audio start could stop a newer playback attempt. The failure
  path now checks the run ID before changing playback state.

The main session verified timer progress across both toggles and injected a late
audio rejection while a newer playback ran. Both passed. Cloud performed source
review only; it did not run an expansion build or browser. The dedicated Cloud
environment remains unavailable, so this handoff used an isolated review in the
existing website runtime without changing that repository.

The later [Opus copy/design pass](provenance/OPUS-SITE-POLISH.md) is outside this
Cloud snapshot. It received separate rendered review and local browser checks.

## Original two-demo review

The first [cloud task](https://chatgpt.com/codex/tasks/task_e_6abe44a79c8c832ab6f6c092e49bf758)
ran with ChatGPT subscription authentication. The only available website runtime
was mapped to `justcarlson.com`, so it was instructed to leave that checkout alone
and clone this public repository into `/tmp/ai-for-good-review`.

That fetch failed with `CONNECT tunnel failed, response 403`. The task confirmed
that the base website checkout stayed unchanged. No workshop review ran there.

The [follow-up Cloud task](https://chatgpt.com/codex/tasks/task_e_6abe46e3c9cc832a94f560a0b98764ad)
completed the review. It received the implementation files from commit
`a2751087fd25a6e807b5c411f541771adb8d1c67` in a compressed source payload and verified
SHA-256 `74c6718dc0fbd1a5c493b22fa513bc2e5a5b0f49d3a4038f98e26ac7c75e3e9c` before extraction.

The worker ran `npm run build`, `npm run check`, ZIP inspection, and local-link
analysis in `/tmp/ai-for-good-review`. All build and syntax checks passed. It found
one medium-severity issue: the extracted home page linked to a ZIP that was not
included inside itself. The build now replaces that link with “Offline copy” in
the archive and excludes the web-only 404 page. The main session verified the
fixed archive with networking disabled.

No other confirmed defects were reported in prepared-output labels, fact
mappings, keyboard shortcuts, reduced motion, or reset/replay source logic.
The Cloud worker did not run a browser or start a server. The main session owns
the separate desktop, phone, and offline browser checks.

The Cloud runtime’s base website checkout stayed clean. No PR or source change
was produced there. This was a source-snapshot handoff; a dedicated environment
mapped to this new repository was not created. Later layout changes only reduced
the home illustration and moved animation controls above the scene; they were
verified locally after the reviewed snapshot.

## Review contract

Use the exact provided source snapshot in an isolated directory. Do not edit the
base website checkout, publish, push, read credentials, call paid models, or start
other agents. Do not start a web server. One shared preview belongs to the main
session; Cloud workers may use the public site when their network permits it.

Check build, JavaScript syntax, offline packaging, local links, keyboard controls,
reduced motion, and prepared-output labels. Report concrete issues with file and
line references. Keep the Opus-authored renderer unchanged; control fixes belong
in the surrounding code. The main session owns integration and publication.

## Provenance

The native Codex text worker reported `gpt-6-astra`. Motion code came from
`anthropic/claude-opus-5.5`; visual review came from
`anthropic/claude-sonnet-5.5`. Prompts, original contributions, and provider receipts
are in `docs/` and `docs/provenance/`. The owner raised the paid task cap to $2 for
the expansion; the $5 UTC-month cap stayed in place. No further paid calls are
needed for this handoff.
