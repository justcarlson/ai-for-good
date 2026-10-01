# Workshop verification

Checked on 1 October 2026 in Chromium. This records actual checks, not a claim
that every browser or physical device was tested.

- Build and syntax: all 14 browser scripts passed. All local HTML targets,
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
