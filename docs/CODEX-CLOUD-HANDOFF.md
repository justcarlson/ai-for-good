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

The follow-up handoff supplies the public source snapshot in the task prompt so
source and build checks can run without fetching GitHub. Its task URL and result
will be recorded when complete. This does not create a repository-mapped Cloud
environment for ongoing work.

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
