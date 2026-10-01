# Workshop verification

Checked on 1 October 2026 in Chromium. This records actual checks, not a claim
that every browser or physical device was tested.

- Build and syntax: all 16 browser scripts passed. All local HTML targets,
  offline ZIP references and CRCs passed. All four route totals were checked.
- Menu and guides: 13 correct titles, source inputs, prompts and prepared examples;
  theme/format/time filtering; presenter mode; Show it / Try it / On paper;
  timer start, pause and reset; no phone overflow.
  After Cloud review, running and paused timers retained progress across presenter
  toggles. Selecting the already active mode also preserved the countdown.
- Existing demos: deck navigation, reset, source highlights, audience check,
  animation controls, palette, pace and reduced motion passed.
- Claim board: all seven selections/classifications, six source cards, correct
  evidence mappings, prepared answers and reset passed.
- Planner: add/remove limits, overflow and late-task warnings, prepared 25/27-hour
  plan, 4 hours deferred, 2 hours spare, note editing and reset passed.
- Pattern Finder: all 24 rows, filters, empty and small samples, fixed rates,
  wait averages, guess comparison and reset passed. Downloadable CSV matches.
- Tiny Tune: note edits, presets, tempo, sound, visual-only playback, reset and
  copy passed. AudioContext ran and produced a nonzero signal (peak 0.042);
  Stop produced zero signal. This does not test a physical room’s speakers.
  A deferred earlier audio start was rejected during newer playback; the current
  run continued. This checks the asynchronous error fix from Cloud review.
- Desktop sizes: 1440×900 and 1440×1000. Phone sizes: 375×812 and 390×844.
  Keyboard controls and visible focus passed; no page-width overflow.
- Axe found no violations in the tested pages. Incomplete checks for one-digit
  labels, note dots and clipped table cells were reviewed separately; the selected
  note colors and table text meet contrast requirements.
- Offline: networking disabled while opening extracted `file://` pages. Demos,
  prepared examples and resets worked. No runtime API dependency exists.
- Publication: all 32 served files matched the tested local build by SHA-256,
  including the downloadable offline ZIP. The custom domain returned HTTPS 200.
- Printing: browser-generated PDFs checked for selected mode, prepared example
  and presenter-only debrief. Print restores the example's open/closed state.
  No physical printer or screen-reader session was tested.

Independent Codex UAT covered the claim board and planner after integration on
the one shared server. The main session covered the menu, guides, routes, data,
audio, original demos and publication. Anthropic visual review is recorded
separately under `docs/provenance/`.

## Opus copy and design pass

After the site-wide pass, 48 desktop/phone page checks, 12 axe audits and 24
control/offline checks passed. No console errors. Final Tiny Tune transport uses
normal flow, leaving all note rows reachable. Pattern Finder inputs use 16px
text; desktop hover retains the primary button’s green background. Opus reviewed
11 real screenshots; its two final corrections were applied and checked.

## Presenter navigation pass

Twenty-eight checks passed for URL-based filters, presenter mode, clear/reset,
empty results, guide and demo return links, route selection and refresh, invalid
query values, and a browser that denies `replaceState`. The same navigation
passed in extracted offline files with networking disabled. Existing timer
progress survived presenter toggles. In-page skip links retain their fragments.

Menu, guide and route axe audits found zero violations or incomplete checks.
Opus reviewed four rendered views and the navigation source, then supplied minor
copy, print-width and phone route-button corrections. Those corrections were
applied. Browser print output was inspected; physical printing remains untested.

## Nonprofit companion

Forty-six checks passed: 20 layouts across 375, 390, 768 and 1440px; exact prepared
field values; source and output labels; copy submission and its denied-permission
fallback; safe text rendering; clear/reset and focus; all nine recipe links;
official handoff links; four opening slides; existing presenter navigation;
reduced motion; and editing/reset in the extracted offline copy.

The clipboard accepted the exact assembled text. Clipboard read permission was
unavailable in the test browser, so the check wrapped the native write operation
and verified its successful argument. No clipboard read-back is claimed.

The companion, home, menu and route pages had no axe violations. A named preview
region was added after an incomplete ARIA check. Textareas grow to fit their
contents. No screen reader or physical phone was used. Visual reviews are
separate from the main session's interaction tests.

Published on `good.justcarlson.com`: all 24 changed files match the tested build
by SHA-256, including the offline ZIP. A phone-size production check confirmed
the updated preset guards, field sizing under the live CSP, nine recipes and
reset, with no browser errors. The final companion axe check has no violations
or incomplete checks. Both new commits passed the secret scan.


## Education-grant writing practice

The learner-first writing exercise uses four fictional cases: a funding request,
a donor email, applicant help and a newsletter. Opus 5.5 supplied the first
concept, copy, teaching correction and screenshot review. Review findings about
numeric qualifiers, sample evidence and mobile navigation were applied.

- `npm run build` and `npm run check` passed: 18 browser scripts, local links,
  offline links and ZIP integrity.
- 45 browser checks passed: learner answers start empty; prepared answers start
  collapsed; four source/draft/revision sets match the reviewed content; case
  attempts survive switching in page memory; shared voice rules persist; reset
  affects the current case; optional hints fill only blanks and carry labels;
  labels disappear on editing; markup stays literal.
- Copy passed through the native clipboard write function with the full current
  instructions. Browser clipboard read-back was not available. Denial selected
  all instruction text; Chromium omits the final newline from the selection.
- The download action supplied a Markdown Blob exactly matching the preview and
  requested the filename `SKILL.md`. This does not assert an operating-system
  file dialog result.
- Keyboard, reduced-motion, 1440/768/390/375 layouts and extracted `file://`
  offline selection/edit/reset passed. Nine added checks cover 320/390 navigation
  bounds, 44px link targets, and CSS-doubled navigation text at 320px. This is not
  a claim about browser zoom or a physical device.
- Axe reported zero violations and zero incomplete checks on the writing page,
  homepage and R-T-C-F companion. The browser recorded no page errors.

Private evidence: `.local/writing-checks.json`, `writing-axe-final.json` and
`writing-review-fix-checks.json`. Prepared examples exercise editorial judgment;
no learner draft is scored and no live model runs in this application.

Publication verified at `https://good.justcarlson.com/writing.html`. All 11
changed public files, including the offline ZIP, matched local SHA-256 hashes.
The live phone check confirmed blank learner answers, collapsed prepared
examples, preserved voice rules, labeled hints, fitted fields and no page
errors under the production content policy. Evidence:
`.local/writing-published-hashes.json` and `.local/writing-live-check.json`.
