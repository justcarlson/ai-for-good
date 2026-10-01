# Opus site copy and design pass

Requested on 1 October 2026. Claude Opus 5.5 reviewed all 28 source files and
11 current desktop/phone screenshots using Emil Kowalski’s
[design engineering](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/emil-design-eng/SKILL.md) and
[mobile](https://github.com/emilkowalski/skills/blob/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/mobile-native/SKILL.md) skills, with Unslop for copy.

## First release: copy

Opus supplied 81 exact replacements covering the home, slides, menu, guides,
routes, prompts, six demos and error/status messages. Its first CSS draft was
withheld after integration review found a hover conflict. Codex corrected two
factual copy slips: a 60-second demo is about a minute, and the activity menu
lists all 13 activities. Source facts, prepared answers, prompts, route durations
and DOM IDs are preserved. Desktop/phone layout checks passed.

## Second release: design

Opus corrected the five shared/page stylesheets: a proportional local font stack,
clearer card hierarchy, shorter mobile headers, 44px controls where appropriate,
16px phone inputs, capability-gated hover and press feedback. Keyboard focus and
reduced motion suppress press movement. No font download or runtime dependency
was added.

Opus then reviewed 11 real rendered screenshots. It removed its own proposed
sticky audio bar because it could cover content, and corrected the remaining
15px textarea. The main session applied those findings and checked the final
mobile note grid: all rows remain visible and usable.

All 48 desktop/phone page and guide layout checks passed. Axe reported zero
violations across 12 pages. The remaining incomplete checks concern decorative
art, note dots and clipped table content; existing colors were retained. Twenty-four
control and offline checks passed, including slides, filters, timer preservation,
prepared answers, reset, reduced-motion scenes and audio controls. Browser console
reported no errors. The build validates all 13 scripts, links and the offline ZIP.

This covers browser checks and rendered viewport sizes, not physical iPhone,
Android, room-speaker or printer testing. Copy/source facts and route timings stay
unchanged after the first release.

Exact model: `anthropic/claude-opus-5.5`. Original design edits, final visual findings
and provider receipts sit beside this file. Codex integrated and verified the
edits; it did not substitute a different model for the creative pass. The owner
removed the per-task spending cap for this pass; the existing $5 UTC-month limit
remains.


## Third release: dedicated landing page

After the owner requested more attention to the home page, Opus rebuilt it with
three clear starting choices, all six interactive demos, all seven guided
exercises, real activity timings and a smaller garden illustration. The new
stylesheet is scoped to the landing page. Opening slides and offline download
contracts are preserved. The first response returned complete HTML but truncated
CSS; an Opus continuation completed the stylesheet. Main corrected the exercise
links to open their actual guides rather than nonexistent menu anchors.

Opus reviewed the rendered desktop and phone pages and returned `ready`. Four
viewport sizes passed without overflow; desktop and phone axe checks found no
violations or incomplete checks. All four slides worked by keyboard. The extracted
offline landing showed six demo cards and seven guide links with the stylesheet
loaded. Exact model and generation receipts are retained beside this file.
