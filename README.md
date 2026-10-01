# AI for Good

[Open the workshop](https://good.justcarlson.com) · [Activity menu](https://good.justcarlson.com/workshop.html?host=1) · [Routes](https://good.justcarlson.com/routes.html) · [Offline ZIP](https://good.justcarlson.com/downloads/ai-for-good.zip)

Thirteen activities for a flexible workshop: six interactive demos and seven
guided exercises. Each guide has Show it, Try it and On paper modes, a prompt,
fictional input, prepared material, and debrief questions. Presenter mode adds
steps and an optional timer. No login or live model call is needed.

## Choose what fits

| Interactive demos | Guided activities |
| --- | --- |
| Seed Courier: an original animated garden story | Ask a Better Question |
| Make it clearer: preserve facts in a rewrite | Spot the Slip |
| Claim Check Board: inspect claims against sources | Story Spark Circle |
| Tiny Tune Maker: compose an original browser loop | Plan B Workshop |
| Tradeoff Week Planner: fit tasks into limited hours | Tool or Not? |
| Pattern Finder: explore a fictional repair-cafe dataset | Explain It Two Ways |
| | Role Swap Planning Table |

Use the home page’s **Start the workshop** button for four opening slides.
Arrow keys move between slides; Escape returns to the home page. The activity
menu filters by theme, format and time. Routes cover 15, 30, 60 and 180 minutes.
The three-hour route is optional for the whole event, shared across speakers.
Menu links keep your filters and presenter mode as you move between pages.
Route links keep the selected time. Use **Clear filters** to show all activities.

Download and unzip the offline copy before presenting. Open `index.html` in the
extracted folder. All activities, demos and guides work without internet. The
prompt copy controls fall back to text selection if browser permissions require
it. External links still need internet. **Print this activity** prints the selected
mode and prepared example; presenter mode also includes the debrief.

## Build and preview

Requires Python 3 and Node.js. No packages need installing.

```sh
npm run build
npm run check
npm run dev
```

Reuse the single running preview at `http://127.0.0.1:4173`. Only the main session
may start it. Cloud workers use source checks or the public site; no extra server.

The build packages the Opus renderers, turns `content/workshop-library.json` into
a local browser script, validates route totals, and creates the offline ZIP.
Checks cover every JavaScript file, local page links, offline links and ZIP
integrity. Cloudflare Pages serves `public/`; `vercel.json` keeps it portable.

## Creative direction and verification

Opus 5.5 authored the Seed Courier motion and Tiny Tune audio engine. Sonnet 5.5
selected the expansion concepts, supplied the first layouts and exercise drafts,
and reviewed rendered screenshots. Codex implemented that direction, corrected
facts and arithmetic, and ran UAT. OpenAI work used ChatGPT subscription access.

Opus 5.5 then revised copy and design across the site using Emil Kowalski’s skills.
That pass shipped in verified releases for copy, design, the landing page and
presenter navigation. Each had an Opus screenshot review.

- [Opus copy/design pass and verification](docs/provenance/OPUS-SITE-POLISH.md)
- [Anthropic direction, review and corrections](docs/provenance/EXPANSION.md)
- [Browser and offline verification](docs/VERIFICATION.md)
- [Codex Cloud handoff](docs/CODEX-CLOUD-HANDOFF.md)
- [Original Opus ideas](docs/ideas-opus.md) and [original Codex text ideas](docs/ideas-codex.md)

Work ran in isolated worktrees, with at most two independent workers. The owner
raised the paid task cap to $2, then removed that cap for the Opus polish pass.
The $5 UTC-month cap stayed in place. Receipts are
under `docs/provenance/`. No generated video or runtime API keys are required.

`task.json` defines assignments and acceptance criteria. The main session keeps
private runtime progress in ignored `state.json`. Credentials and private plans
are excluded from Git.
