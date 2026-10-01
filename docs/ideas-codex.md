# Three workshop demo ideas

Recommend **Make it clearer**. It solves a familiar problem, gives the audience a quick fact-checking task, and needs only one screen. Build one idea in 20 minutes; the three are alternatives.

All examples below are fictional. Use a local browser page with built-in fonts, text, and simple CSS. No installation for participants, external assets, or employer branding. These are proposals only. The motion demo remains assigned exclusively to Claude Opus 5.5.

## Shared limits

- Default to saved examples. Label each result **“Prepared AI output · fictional example.”** These drafts were written in this Codex session. No separate model call or visual review was performed. The exact provider model ID is unavailable here; do not invent one.
- A button that reveals saved text says **“Show prepared example.”** No fake typing, loading spinner, or claim that the page ran a model. Local comparisons and selections say **“Local interaction · no AI call.”**
- Optional live inference is a separate presenter step in an already signed-in ChatGPT session. Label it **“Live AI output · check against source.”** It is outside the 20-minute build and is not needed for the demo. Record the prompt and available model details if used; keep credentials outside the page.
- Every demo has a Reset button, visible keyboard focus, native buttons, readable contrast, and stacked panels on small screens. No animation is needed. Respect reduced-motion settings if transitions are added.
- When implementation starts, document actual build, preview, and verification commands. Final visual review must use Claude Opus 5.5 or Sonnet 5.5, with the exact provider model ID and receipt. This document does not claim that review.

## 1. Make it clearer

A confusing notice becomes a short action card. Audience members play “fact keeper”: select an action to see its source sentence. Keep missing details visible.

**Prepared source**

> Pine Street Pantry packers: Saturday's session is now 10:30–12:00, not 10:00, at Willow Hall. We can take up to eight volunteers. Tell Jo by Thursday at 17:00 if you can come; don't just turn up. Bring a reusable bag if you have one. Under-16s must come with an adult. Delivery drivers should still arrive at 10:00 at the pantry. We'll explain packing when you get here.

**Prepared AI output · fictional example**

> **Want to pack bags for Pine Street Pantry?**
>
> 1. Tell Jo by Thursday at 17:00. Do not just turn up. There is space for up to eight volunteers.
> 2. Come to Willow Hall on Saturday, 10:30–12:00. The start has changed from 10:00 to 10:30.
> 3. Bring a reusable bag if you have one. If you are under 16, come with an adult.
>
> Packing instructions will be given when you arrive.
>
> **Delivery drivers:** Arrive at the pantry at 10:00 as before.
>
> **Check with the organiser:** The notice does not give calendar dates, addresses, or a way to contact Jo.

**Reusable prompt**

> Turn this notice into actions. Preserve names, times, places, limits, optional items, and exceptions. Keep different roles separate. List missing details; do not guess them. Give each action its exact supporting source sentence.

**60-second stage script**

- **0–15 seconds:** “You want to help at a pantry. Read this notice. When do you arrive? Take five seconds. There are two times because there are two jobs.” Pause for answers.
- **15–30 seconds:** Select Show prepared example. “This is a prepared AI draft. Packers get a short action list. Drivers keep their own instruction. The bag stays optional.”
- **30–45 seconds:** Select the packers' time. “Here is the sentence behind that action. Did the draft keep the eight-person limit and the adult requirement?” Pause for a check.
- **45–60 seconds:** “How do we contact Jo? The notice never says. The draft must leave that gap visible. We can ask the organiser before sharing it.” Select Reset.

**20-minute scope:** 5 minutes for two text panels; 7 for reveal and fixed source links; 4 for Reset and keyboard access; 4 for fact and offline checks. Use static sentence mappings. Free-text rewriting is outside this build.

**Acceptance criteria**

- Every fact in the source survives, including the drivers' exception, optional bag, packing instructions, and sign-up requirement.
- Each action opens the correct source sentence using mouse or keyboard. Missing details appear separately from facts.
- Reset restores the original notice and hides the result. The prepared label stays visible with the result.
- With networking disabled, the page opens from a local file and all controls work.

**Offline fallback:** Use the saved page. If browser interaction fails, show two saved slides with the source and result, and ask the same fact-checking questions.

## 2. Catch the helpful mistake

A three-round text game: reveal a shorter notice and find the fact that changed. The intentionally wrong drafts make useful discussion material.

**Prepared source**

> Brook Lane Repair Table opens Sunday, 14:00–16:00, in the library foyer. Bring one small household item. Repairs are free; replacement parts may cost extra. Booking is optional. We cannot accept microwaves.

**Prepared AI output · fictional example · deliberate errors**

Each round shows this common text: “Sunday, 14:00–16:00, library foyer. Bring one small household item. No microwaves.” Add one pair below:

| Round | Draft wording | Correct replacement |
| --- | --- | --- |
| 1 | “Repairs and parts are free. Booking is optional.” | “Repairs are free; replacement parts may cost extra. Booking is optional.” |
| 2 | “Repairs are free; replacement parts may cost extra. Booking is required.” | “Repairs are free; replacement parts may cost extra. Booking is optional.” |
| 3 | “Repairs are free; replacement parts cost extra. Booking is optional.” | “Repairs are free; replacement parts may cost extra. Booking is optional.” |

**Reusable prompt**

> Shorten the notice without changing its facts. Preserve exclusions and words such as “may” and “optional.” Compare each rewritten claim with the source before returning the draft.

**60-second stage script**

- **0–15 seconds:** “This repair event sounds useful. Here is its notice and a prepared draft with one deliberate mistake. Find it.” Reveal round one; pause.
- **15–30 seconds:** Select the price sentence. “Free repairs became free parts too. One small edit changed what visitors would expect to pay.” Reveal the correction.
- **30–45 seconds:** Advance through rounds two and three. “Is booking required? Do parts always cost extra? Check the original words.” Pause for answers.
- **45–60 seconds:** “Short text can still be wrong. Ask AI for a draft, then check the claims people will act on. These errors were planted for this game.” Select Reset.

**20-minute scope:** 5 minutes for source and round cards; 7 for fixed answer buttons and corrections; 4 for Reset and keyboard access; 4 for checks. No scoring model, text analysis, or timer.

**Acceptance criteria**

- Each round contains exactly one changed claim. A correct answer shows the source phrase and corrected wording.
- Incorrect answers invite another try without advancing. All answers and navigation work from the keyboard.
- Reset returns to round one and clears feedback. Deliberate-error and prepared-output labels remain visible.
- The three rounds work from a local file with networking disabled.

**Offline fallback:** Save the rounds and answers as static slides. Ask for a show of hands, then reveal each correction.

## 3. Find your small job

A volunteer picks an available time and sees which jobs fit. A prepared AI draft turns a community notice into task cards; a simple local filter handles matching.

**Prepared source**

> Fern Court Seed Swap needs table setters from 09:00–09:20, label writers from 09:20–09:40, and welcome-desk helpers from 09:00–09:40. All jobs are in Cedar Room. Each job needs someone for its full time. No gardening knowledge is needed. Ask Noor to confirm a place before coming.

**Prepared AI output · fictional example**

| Task card | Full time needed | Place |
| --- | --- | --- |
| Set tables | 09:00–09:20 | Cedar Room |
| Write labels | 09:20–09:40 | Cedar Room |
| Welcome visitors | 09:00–09:40 | Cedar Room |

Shared card note: “No gardening knowledge needed. Ask Noor to confirm a place before coming.”

Prepared selection: **“I'm free 09:20–09:40.”** Local result: **“Write labels fits your time. Ask Noor to confirm a place.”** The source gives no date, address, contact method, or remaining capacity; do not invent them.

**Reusable prompt**

> Make one task card per job. Preserve the full shift, place, knowledge requirement, and confirmation step. Do not infer capacity or assign anyone a place.

**60-second stage script**

- **0–15 seconds:** “You have twenty minutes to help at a seed swap. Read these jobs. Which one fits if you are free from 09:20 to 09:40?” Pause.
- **15–30 seconds:** Reveal the cards and select that time. “These cards are a prepared AI draft. The browser checks times locally. Writing labels fits.”
- **30–45 seconds:** Select 09:00–09:40. “With forty minutes, any one of these jobs fits. This does not book a place or suggest doing overlapping jobs.”
- **45–60 seconds:** “The useful part is making the choices easy to see. We still need Noor to confirm space. Can you find that instruction in the source?” Pause, then select Reset.

**20-minute scope:** 5 minutes for three cards; 7 for three fixed time choices and a lookup table; 4 for Reset and keyboard access; 4 for source and offline checks. No scheduling engine or bookings.

**Acceptance criteria**

- 09:00–09:20 shows table setting only; 09:20–09:40 shows label writing only; 09:00–09:40 shows all three as alternatives.
- Full shifts, Cedar Room, the knowledge requirement, and confirmation instruction match the source. No result claims a reserved place.
- Keyboard selection works; Reset restores the prepared 09:20–09:40 choice. Prepared cards and local matching have separate labels.
- All choices work from a local file with networking disabled.

**Offline fallback:** Show the source and task cards on one saved slide. Read out an availability window and let the audience choose a card.

## Minimal four-slide home-page opening

Use four static panels with Previous, Next, and Start again controls. Support keyboard navigation and show “1 of 4,” etc. No autoplay or motion. Keep a local copy.

| Slide | On-screen copy | Presenter cue |
| --- | --- | --- |
| 1 | **AI for Good** / Small tools for community work. | “Today we'll try one small task that could help a volunteer.” |
| 2 | **Can you find your next step?** / Read a notice. Find the time, place, and first action. | Show the fictional pantry notice from idea 1. Allow five seconds to read. |
| 3 | **Make it clearer** / Keep the facts. Show what's missing. Check before sharing. | Open the recommended demo. Point out its prepared-output label. |
| 4 | **Your turn** / Pick a fictional notice. Make an action card. Swap with a partner and check every fact. / 20 minutes. | Keep a prepared example available for anyone working offline. |

Opening acceptance: all four panels fit an ordinary laptop screen, controls work by keyboard, Start again returns to slide one, and the demo link names its destination. This is an opening proposal, not an implemented or visually reviewed page.
