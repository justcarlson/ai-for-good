# Anthropic-led workshop expansion

The owner requested more choices for a three-hour event and required Opus or
Sonnet to lead every new idea and first design. Codex implementation was stopped
before files were created, then resumed against Sonnet’s selected concepts.

Claude Sonnet 5.5 supplied the menu design, four new interactive concepts, seven
guided activities (Role Swap was converted from an interactive proposal), source
material, prompts, example answers, routes and audio presets. Claude Opus 5.5
wrote the original Tiny Tune audio scheduler and synthesizer. The existing Opus
Seed Courier and Codex text demo were retained.

The canonical reviewed material is `content/workshop-library.json`. The original
model responses are retained as `.raw.txt` references: they include an incomplete
JSON response and draft errors and are not the final activity content. Separate
Sonnet continuations supplied factual corrections, complete routes and presets.
Provider receipts retain exact model IDs, token counts and costs.

## Integration review

Codex corrected a tool-loan claim that confused transactions with unique people,
fixed the planner’s 29-hour workload / 27-hour capacity arithmetic, and verified
the 25-hour prepared plan. Sonnet revised unsupported equipment and deadline
details, unconfirmed backup venues/roles, a story’s continuity, and the distinction
between contradiction and missing evidence. The Pattern Finder rows were created
to match Sonnet’s aggregate specification and checked against their displayed
calculations. The weekday filter became a session filter because all visits are
on Saturdays.

Seven actual screenshots went back to Sonnet for visual review: menu desktop,
guide phone, Tiny Tune desktop, Pattern Finder desktop, claim board desktop,
planner desktop and planner phone. Its visible-design findings are recorded in
`expansion-design-review-sonnet.json`. This was not an interaction test.

Applied polish: forest-green data bars, explicit No visits labels, neutral sample
cautions, a quieter playback marker, transport controls above the note grid,
less prominent audio credit, larger lab navigation targets, planner section
jumps, aligned card links and a compact phone guide toolbar. Sonnet also supplied
four complete fictional viewpoint cards for Role Swap. Real needs are explicitly
left for participants to confirm with people.

The Opus engine in `src/tiny-tune.js` is preserved; Codex supplied the page shell,
controls, visual-only mode, volume control and stop-on-navigation behavior.
