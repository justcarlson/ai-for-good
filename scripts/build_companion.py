"""Render the static companion from the reviewed Opus content."""
from html import escape
from pathlib import Path
import json


def build(root):
    data = json.loads((root / 'content/nonprofit-companion.json').read_text())
    page, public = data['page'], root / 'public'
    builder = page['builder']
    e = escape
    sections = {s['id']: s for s in page['sections']}
    fields = ''.join(
        f'<div class="prompt-field"><label for="prompt-{f["id"]}"><span aria-hidden="true">{f["id"][0].upper()}</span>{e(f["label"])}</label>'
        f'<p id="hint-{f["id"]}">{e(f["hint"])}</p>'
        f'<textarea id="prompt-{f["id"]}" name="{f["id"]}" rows="{7 if f["id"] == "context" else 3}" aria-describedby="hint-{f["id"]}" autocomplete="off" spellcheck="true"></textarea></div>'
        for f in builder['fields'])
    presets = ''.join(
        f'<button type="button" class="copy-button" data-preset="{e(p["id"])}" aria-pressed="false">{e(p["label"])}</button>'
        for p in builder['presets'])
    recipes = ''
    for index, recipe in enumerate(page['recipes'], 1):
        practice = ''
        if recipe['practiceActivityId']:
            practice = f'<a class="text-link" href="activity.html?id={e(recipe["practiceActivityId"])}">Optional practice →</a>'
        recipes += f'<li><span class="recipe-number" aria-hidden="true">{index:02}</span><div><h3><a href="https://rtcf-workshop.emergent.host/build">{e(recipe["title"])}&nbsp;↗</a></h3><p>{e(recipe["oneLine"])}</p>{practice}</div></li>'
    cards = ''.join(f'<section><h2>{e(sections[k]["heading"])}</h2><p>{e(sections[k]["body"])}</p></section>' for k in ['data-rule', 'review'])
    coaches = ''.join(f'<li>{e(s)}</li>' for s in page['coachNotes'])
    handoff = ''.join(f'<li>{e(s)}</li>' for s in page['handoffSteps'])
    html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4eee1"><meta name="description" content="Nonprofit practice prompts using Role, Task, Context and Format. A companion to the AI Lab session, with fictional examples and no live AI calls."><title>{e(page['title'])}</title><link rel="icon" href="assets/seed.svg"><link rel="stylesheet" href="assets/workshop.css"><link rel="stylesheet" href="assets/nonprofit.css"><script src="assets/nonprofit-presets.js" defer></script><script src="assets/nonprofit.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><header class="masthead wrap"><a class="wordmark" href="index.html"><img src="assets/seed.svg" alt="" width="31" height="31"> AI FOR GOOD</a><nav aria-label="Main navigation"><a href="nonprofit.html" aria-current="page">Companion</a><a href="workshop.html">Practice</a><a href="https://rtcf-workshop.emergent.host/">AI Lab ↗</a></nav></header>
<main id="main" class="wrap nonprofit-page"><section class="page-header"><p class="eyebrow">{e(page['eyebrow'])}</p><h1>{e(page['heading'])}</h1><p>{e(page['intro'])}</p><div class="actions"><a class="primary" href="#builder">{e(builder['heading'])} ↓</a><a class="text-link" href="https://rtcf-workshop.emergent.host/">{e(page['sourceLinkLabel'])}</a></div></section>
<section class="scope-card" aria-labelledby="scope-heading"><h2 id="scope-heading">{e(sections['next-week']['heading'])}</h2><p>{e(sections['next-week']['body'])}</p></section>
<section id="builder" aria-labelledby="builder-heading"><div class="companion-heading"><p class="eyebrow">Role · Task · Context · Format</p><h2 id="builder-heading">{e(builder['heading'])}</h2><p>{e(builder['intro'])}</p></div>
<div id="presets" class="prompt-presets" role="group" aria-label="Fictional prompt presets">{presets}</div><p class="prepared-note">{e(builder['preparedNote'])}</p>
<div class="builder-grid"><div class="prompt-fields">{fields}</div><aside class="prompt-preview" aria-labelledby="preview-heading"><p class="eyebrow" id="prompt-state">Prepared starting prompt</p><h3 id="preview-heading">Your prompt</h3><pre id="assembled-prompt" tabindex="0" role="region" aria-label="Assembled prompt">{e(builder['emptyHint'])}</pre><div class="prompt-actions"><button type="button" class="primary" id="copy-nonprofit-prompt">{e(builder['copyLabel'])}</button><button type="button" class="copy-button" id="reset-nonprofit-prompt">{e(builder['resetLabel'])}</button></div><p id="prompt-status" role="status"></p><div id="preset-reference"><h3 id="source-heading">Fictional source</h3><p id="preset-source"></p><h3>Review the result</h3><p id="preset-review"></p></div></aside></div>
<noscript><p>The builder needs JavaScript. Read the four field hints and write the prompt in your own workspace. The official session links below still work.</p></noscript></section>
<div class="review-cards">{cards}</div>
<section class="recipe-section" aria-labelledby="recipes-heading"><div class="companion-heading"><p class="eyebrow">Continue in the official AI Lab</p><h2 id="recipes-heading">Choose one build recipe</h2><p>These nine recipes live on the AI Lab Build page. Open it, then choose the recipe there.</p></div><ol class="recipe-list">{recipes}</ol></section>
<details class="coach-notes"><summary>For coaches</summary><ul>{coaches}</ul><a class="text-link" href="https://rtcf-workshop.emergent.host/mentors">Read the mentor guide ↗</a></details>
<section class="handoff" aria-labelledby="handoff-heading"><h2 id="handoff-heading">Keep it with your team</h2><ol>{handoff}</ol><p>{e(sections['official']['body'])}</p><div class="official-links"><a href="https://rtcf-workshop.emergent.host/prompt-school">Prompt School ↗</a><a href="https://rtcf-workshop.emergent.host/build">The Build ↗</a><a href="https://rtcf-workshop.emergent.host/mentors">Mentor Resources ↗</a><a href="https://rtcf-workshop.emergent.host/stack">The Sustainable Stack ↗</a></div><p class="small-note">Official session links need internet. This companion and its prepared prompts work offline.</p></section>
</main><footer class="wrap footer"><span>AI for Good · optional companion</span><div><a href="workshop.html">Practice library</a><a href="index.html">Home ↑</a></div></footer></body></html>
'''
    (public / 'nonprofit.html').write_text(html)
    (public / 'assets/nonprofit-presets.js').write_text('window.NONPROFIT_PRESETS = ' + json.dumps(builder['presets'], ensure_ascii=False) + ';\n')


if __name__ == '__main__':
    build(Path(__file__).resolve().parent.parent)
