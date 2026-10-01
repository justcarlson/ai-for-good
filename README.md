# AI for Good

[Open the workshop](https://good.justcarlson.com) · [Hosting backup](https://ai-for-good-workshop.pages.dev) · [Download the offline copy](https://good.justcarlson.com/downloads/ai-for-good.zip)

Two small browser demos, an opening presentation, and reusable prompts. No login,
installation, or live model call is needed to run them.

- **Seed Courier:** a 45-second garden story drawn and animated by Claude Opus 5.5.
  Press Play, add helpers, change the palette or pace, and replay. Motion off
  provides still scenes.
- **Make it clearer:** inspect a prepared rewrite of a fictional volunteer notice.
  Select an action to see its source, then ask whether bringing a bag is required.

## Present it

1. Open the workshop and choose **Start the workshop** for four opening slides.
   Arrow keys move between slides; Escape returns to the home page.
2. Open Seed Courier. Press **Play the story**, invite helpers, then try Blueprint.
3. Open Make it clearer. Reveal the example, check the drivers’ arrival time,
   and ask the audience the bag question.
4. Use **Take a prompt** to let people try a change themselves.

Download and unzip the offline copy before presenting. Open `index.html` in the
extracted folder. Both demos and the deck work without internet; external links
and the prompt clipboard button may need the normal browser permissions.

## Build and preview

Requires Python 3 and Node.js for syntax checks. No packages need installing.

```sh
npm run build
npm run check
npm run dev
```

The preview uses `http://127.0.0.1:4173`. Reuse the running server if there is one;
only the main session may start it. All delegates share this preview. Cloud
workers use source checks or the public site and must not start another server.

The build preserves the Opus renderer, exposes it as a classic browser script,
and packages the static site into `public/downloads/ai-for-good.zip`.
Cloudflare Pages serves `public/`; `vercel.json` keeps the site portable.

## Models and review

- Opus 5.5 supplied [motion ideas](docs/ideas-opus.md) and [the renderer](src/seed-scene.js).
- Codex supplied [text ideas](docs/ideas-codex.md), workshop pages, and controls.
  OpenAI work used ChatGPT subscription authentication.
- Sonnet 5.5 reviewed four rendered screenshots. Its [review and applied fixes](docs/provenance/design-review-sonnet.md)
  and [provider receipt](docs/provenance/design-review-sonnet.receipt.json) are recorded.
- [Codex Cloud handoff](docs/CODEX-CLOUD-HANDOFF.md) records the cloud task and its scope.

Ideas were produced in separate Git worktrees. Paid models stayed within the
$0.50 task limit. Generated video was omitted to keep the workshop within budget.
No credentials or private plans are included in this repository.

`task.json` defines assignments and acceptance criteria. The main session keeps
private runtime progress in ignored `state.json`.
