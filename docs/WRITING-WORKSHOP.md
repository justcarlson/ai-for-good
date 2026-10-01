# Education-grant writing practice

The member works on education grants for high achievers from disadvantaged
communities. This companion will focus on writing for students and families,
funders and supporters. The user clarified that this is a teaching exercise. Learners use fictional
samples and facts to practice a method; no real organization materials are
needed in the room.

Build with `npm run build`; check with `npm run check`. Reuse the main preview
at `http://127.0.0.1:4173`. Browser verification covers example selection,
voice editing, instruction export, reset, keyboard use, mobile layout and the
extracted offline ZIP. The page makes no model calls and uses no browser storage.

Opus 5.5 owns the first concept, copy and design pass. Codex implements and
verifies. Opus reviews screenshots of the rendered page before publication.

The teaching correction is recorded in `docs/provenance/writing-teaching-opus.json` and its
receipt. Codex kept two actual voice samples, corrected the suggested
"written by the coach" label to "prepared", used page memory instead of
sessionStorage, and kept reset immediate with explicit labels. These are
teaching examples, not claimed human-authored answers.

## What the member can practice

- A funding request for a program officer: distinguish a request from an award,
  and enrollment counts from measured impact.
- A donor email: describe the general fund without promising sponsorship or
  unapproved recipient updates.
- Applicant help: keep eligibility separate from selection and flag an unknown
  notification date and missing essay topic.
- A newsletter: show the actual volunteer commitment and conflict rule.

The page starts with a fictional funding request. Her sector informs the
practice. These examples do not claim to match her actual organization's voice,
grant rules or results. The purpose is to teach her how to form and test her own
writing instructions.

Two invented samples explain observable voice patterns. The builder separates
shared voice from the current brief. Switching cases keeps the edited voice;
the learner fields begin blank. Optional hints fill only blank answers and
carry a visible prepared-guide label until edited. Attempts and briefs stay in
page memory while switching cases. Reset clears only the current case's answers
and attempt; clearing the whole exercise removes all attempts and fields.
No browser storage is used. The full Markdown preview supports copy and download. The
standalone `public/handouts/nonprofit-writing-SKILL.md` also works as a text
instruction template without any skill installer or external dependencies.
The handoff asks the member to test a second brief and revise one rule.

## Editorial direction

The writing process follows Unslop, which incorporates Humanizer's editing
checks. The upstream Humanizer is by Siqi Chen:
https://github.com/blader/humanizer. These checks improve writing; they do not
identify authorship or provide an AI detector score. Writing Great Skills
informed the trigger, explicit workflow and review criteria. No global skills
were changed or installed.

Opus 5.5 selected the concept, first layout, voice examples and case drafts.
The unmodified direction and generation receipt are preserved in
`docs/provenance/writing-direction-opus.json` and its receipt. Codex removed
unsupported inferences about eligible applicants and exhausted funds, removed
an assumed free-choice essay topic, restored the GPA scale, and made the
exported workflow self-contained. The hypothetical count 212 applicants does
not establish how many qualified or why some were not selected.

The new model pass has an enforced $0.50 cap, within the existing $5 UTC-month
cap. Exact provider model IDs and generation receipts remain in provenance.


Opus reviewed seven rendered screenshots, then a follow-up set for the fixes.
The review corrected a hint that could drop approximate-number qualifiers and
a pattern note that overstated the sample's evidence. Mobile navigation now
wraps below the wordmark with 44px targets. Exact reviews and receipts are in
`docs/provenance/writing-review-opus.*` and `writing-final-review-opus.*`.

The five writing-pass calls reported $0.277960 in total. The monthly ledger
conservatively holds $3.290492, including an older failed-call reservation.
The first follow-up review was truncated; its partial response and receipt
were retained, and the completed follow-up returned ready with no findings.
