# Codex Cloud handoff

The public repository is [justcarlson/ai-for-good](https://github.com/justcarlson/ai-for-good).
The website and demos are implemented; Cloudflare Pages serves the static files.

## Cloud status

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
are in `docs/` and `docs/provenance/`. Paid calls have a $0.50 total task cap and
$5 UTC-month cap. No further paid calls are needed for this handoff.
