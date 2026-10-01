"""Render the education-grant writing exercise from reviewed content."""
from html import escape as e
import json


def build(root):
    data = json.loads((root / 'content/nonprofit-writing.json').read_text())
    page, org, teaching = data['page'], data['organization'], data['teaching']
    cases = ''.join(f'<button class="copy-button" type="button" data-case="{e(c["id"])}" aria-pressed="false">{e(c["label"])}</button>' for c in data['cases'])
    samples = ''.join(f'<figure><blockquote>{e(s["text"])}</blockquote></figure>' for s in org['samples'])
    patterns = ''.join(f'<li>{e(s["pattern"])}</li>' for s in org['samples'])
    def field(key, label, hint, rows=3):
        return f'<div class="writing-field field-{key}"><label for="writing-{key}">{e(label)}</label><p id="hint-{key}">{e(hint)}</p><textarea id="writing-{key}" rows="{rows}" aria-describedby="hint-{key}" spellcheck="true" autocomplete="off"></textarea><span class="guide-tag" id="guide-{key}" hidden>From the prepared guide</span></div>'
    reference_fields = ''.join(field(*args) for args in [
        ('organization', 'Organization', 'Use the fictional name for practice, or name your own organization.', 2),
        ('samples', 'Voice samples', 'These invented samples are source material. Their facts do not carry into a new brief.', 5),
    ])
    voice_fields = field('voice', teaching['voicePrompt'], teaching['voiceHint'], 4) + field('avoid', 'What should the writer avoid?', 'Name a habit you would change and explain why. Keep useful grant terms.', 3)
    reader_fields = field('audience', 'Who is reading?', 'Describe the reader and what they need from this piece.', 2) + field('purpose', 'What should they do next?', 'Write the decision or action this piece should support.', 2)
    brief_fields = ''.join(field(*args) for args in [
        ('format', 'Format and length', 'For example: a short funding request or an applicant help article.', 2),
        ('facts', 'Approved facts and open questions', 'Keep numbers, conditions and unknowns. Use fictional data for workshop practice.', 8),
    ])
    coach = ''.join(f'<li>{e(s)}</li>' for s in data['coachSteps'])
    (root / 'public/writing.html').write_text(f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4eee1"><meta name="description" content="Practice education-grant writing: audience, organization voice, supported facts and a reusable writing skill. Four fictional examples, no live AI."><title>Education-grant writing · AI for Good</title><link rel="icon" href="assets/seed.svg"><link rel="stylesheet" href="assets/workshop.css"><link rel="stylesheet" href="assets/writing.css"><script src="assets/writing-content.js" defer></script><script src="assets/writing.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><header class="masthead wrap"><a class="wordmark" href="index.html"><img src="assets/seed.svg" alt="" width="31" height="31"> AI FOR GOOD</a><nav aria-label="Main navigation"><a href="writing.html" aria-current="page">Writing</a><a href="nonprofit.html">R-T-C-F</a><a href="https://rtcf-workshop.emergent.host/">AI Lab ↗</a></nav></header>
<main id="main" class="wrap writing-page"><section class="page-header"><p class="eyebrow">Education grants · writing skills</p><h1>{e(page['heading'])}</h1><p>{e(page['intro'])}</p><div class="actions"><a class="primary" href="#examples">Try one writing task ↓</a><a class="text-link" href="#skill-builder">Build your writing skill ↓</a></div></section>
<aside class="disclosure"><p>{e(page['disclosure'])}</p><p>Use the fictional material to practice the method. Your answers are not graded. Bring the method back to your own organization later.</p></aside>
<section id="examples" aria-labelledby="examples-title"><p class="eyebrow">01 / Choose the reader</p><h2 id="examples-title">Start with one reader</h2><p>{e(page['exercise'])}</p><div class="case-choices" role="group" aria-label="Fictional writing examples">{cases}</div>
<article id="practice-case" aria-labelledby="case-title"><h3 id="case-title"></h3><dl class="case-brief"><dt>Reader</dt><dd id="case-audience"></dd><dt>Purpose</dt><dd id="case-purpose"></dd></dl><details class="source-facts" open><summary>Fictional source facts</summary><p id="case-facts"></p></details><div class="writing-fields learner-reader">{reader_fields}</div><div class="voice-reference"><p class="eyebrow">02 / Find the patterns</p><h3>Find the voice in two samples</h3><p>Both samples come from {e(org['name'])}. Notice the sentence rhythm, structure and choice of words.</p>{samples}<div class="writing-fields">{voice_fields}</div><details id="prepared-patterns"><summary>{e(teaching['preparedVoiceLabel'])}</summary><ul>{patterns}</ul></details></div>
<p class="eyebrow">03 / Check and edit</p><div class="draft-before"><h4>Draft to edit · includes unsupported claims</h4><p id="case-before"></p></div>
<div class="writing-field"><label for="writing-attempt">{e(teaching['attemptLabel'])}</label><p id="hint-attempt">{e(teaching['attemptHint'])}</p><textarea id="writing-attempt" rows="6" aria-describedby="hint-attempt" spellcheck="true"></textarea><p class="small-note">Your attempt stays here while you switch cases. Copy anything you want to keep before reloading.</p></div>
<details id="prepared-revision"><summary>Show the prepared revision and reasons</summary><p>{e(teaching["comparePrompt"])}</p><div class="draft-after"><h4>Prepared revision · written ahead of time</h4><p id="case-after"></p></div><ol id="case-edits"></ol><p id="case-check" class="check-note"></p></details></article></section>
<section id="skill-builder" aria-labelledby="skill-title"><p class="eyebrow">04 / Test your instructions</p><h2 id="skill-title">Build your writing skill</h2><p>{e(page['builderIntro'])}</p><p>The reader, next step and voice rules above become part of this file. Your practice edit stays in the exercise; it is not added to the reusable guide.</p>
<div class="builder-toolbar"><button type="button" id="use-writing-guide" class="copy-button">Use prepared hints for blank answers</button><button type="button" id="reset-writing" class="copy-button">Reset this case</button><button type="button" id="clear-writing" class="copy-button">Clear the whole exercise</button></div><p id="builder-state" class="small-note">Practice facts loaded. Your reader and voice answers start blank.</p>
<details class="source-fields"><summary>Edit the source material and format</summary><p>These fields are already filled for practice. Keep the supplied facts while you learn the method.</p><div class="writing-fields">{reference_fields}{brief_fields}</div></details>
<div class="export-box"><p class="eyebrow">Copy, test, revise</p><h2>Your reusable instructions</h2><p>Copy the instructions into your approved workspace. The Markdown file has a reusable voice guide and a separate brief for this piece. No special skill installer is required.</p><div class="export-actions"><button type="button" id="copy-writing" class="primary">Copy instructions</button><button type="button" id="download-writing" class="copy-button">Download SKILL.md</button></div><p id="writing-status" role="status"></p><details id="preview-details"><summary>Read the full instructions</summary><pre id="skill-preview" tabindex="0" role="region" aria-label="Writing skill instructions"></pre></details></div></section>
<section class="writing-handoff"><h2>Try a second brief</h2><p>{e(page['handoff'])}</p><p>Choose a different case above. Keep your voice rules, name its reader and next step, then try your instructions in your approved AI workspace. Compare the result with the new source facts. Change one rule that did not help and try again.</p><a class="text-link" href="nonprofit.html#builder">Use Role, Task, Context and Format →</a></section><details class="coach-notes"><summary>For the coach</summary><ol>{coach}</ol><a href="https://rtcf-workshop.emergent.host/mentors">Official mentor guide ↗</a></details>
<noscript><p>The editable exercise needs JavaScript. Use the <a href="handouts/nonprofit-writing-SKILL.md">prepared writing skill</a> as a text guide.</p></noscript>
</main><footer class="wrap footer"><span>AI for Good · optional writing companion</span><div><a href="https://rtcf-workshop.emergent.host/">Official AI Lab ↗</a><a href="workshop.html">Other practice</a></div></footer></body></html>''')
    (root / 'public/assets/writing-content.js').write_text('window.WRITING_CONTENT = ' + json.dumps({key: data[key] for key in ['organization', 'cases', 'skill']}, ensure_ascii=False) + ';\n')
    skill = data['skill']
    template = f'---\nname: {skill["name"]}\ndescription: {json.dumps(skill["description"])}\n---\n# Organization writing skill\n\n'
    for title, hint in [('Organization', 'Name your organization.'), ('Voice to keep', 'Describe rhythm, structure, vocabulary and formality.'), ('Voice samples and observed patterns', 'Add two or three approved samples and explain their patterns. Use them for style only; never carry their facts into a new brief.'), ('Editing preferences', 'Name weak habits to change and useful terms to keep.')]:
        template += f'## {title}\n[{hint}]\n\n'
    template += '## Workflow\n' + '\n'.join(f'{i}. {s}' for i, s in enumerate(skill['workflow'], 1))
    template += '\n\n## Before publishing\n' + '\n'.join('- ' + s for s in skill['review'])
    template += '\n\n# Brief for this piece\nReplace this entire section for each new piece. Never carry old facts into a new task.\n\n## Audience\n[Who is reading?]\n\n## Purpose and reader action\n[What should they do?]\n\n## Format and length\n[What do you need?]\n\n## Approved facts and open questions\n[Add approved source text. Mark unknowns. Do not guess.]\n'
    (root / 'public/handouts/nonprofit-writing-SKILL.md').write_text(template)
