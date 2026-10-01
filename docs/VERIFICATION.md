# Workshop verification

Checked on 1 October 2026 in Chromium. This records actual checks, not a claim
that every browser or physical device was tested.

- Build and syntax: all 13 browser scripts passed. All local HTML targets,
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
- Printing: print CSS and before/afterprint hooks inspected. Paper output and
  pagination were not physically tested. No screen-reader session was run.

Independent Codex UAT covered the claim board and planner after integration on
the one shared server. The main session covered the menu, guides, routes, data,
audio, original demos and publication. Anthropic visual review is recorded
separately under `docs/provenance/`.
