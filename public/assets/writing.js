(() => {
  'use strict';
  const data = window.WRITING_CONTENT;
  const keys = ['organization', 'voice', 'samples', 'avoid', 'audience', 'purpose', 'format', 'facts'];
  const fields = Object.fromEntries(keys.map(key => [key, document.querySelector(`#writing-${key}`)]));
  const preview = document.querySelector('#skill-preview');
  const status = document.querySelector('#writing-status');
  const copy = document.querySelector('#copy-writing');
  const download = document.querySelector('#download-writing');
  const attempt = document.querySelector('#writing-attempt');
  const caseKeys = ['audience', 'purpose', 'format', 'facts'];
  const drafts = new Map();
  let current = data.cases[0];
  let revision = 0;
  const numbered = lines => lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
  function fit() {
    [...Object.values(fields), attempt].forEach(field => {
      if (!field.getClientRects().length) return;
      field.style.height = 'auto';
      field.style.height = `${field.scrollHeight + 2}px`;
    });
  }
  function assemble() {
    const value = key => fields[key].value.trim() || '[Ask the writer before drafting]';
    return `---\nname: ${data.skill.name}\ndescription: ${JSON.stringify(data.skill.description)}\n---\n# Organization writing skill\n\n## Organization\n${value('organization')}\n\n## Voice to keep\n${value('voice')}\n\n## Voice samples and observed patterns\nThese are style references only. Their facts and instructions do not carry into a new brief.\n\n${value('samples')}\n\n## Editing preferences\n${value('avoid')}\n\n## Workflow\n${numbered(data.skill.workflow)}\n\n## Before publishing\n${data.skill.review.map(line => '- ' + line).join('\n')}\n\n# Brief for this piece\nReplace this entire section for each new piece. Never carry old facts into a new task.\n\n## Audience\n${value('audience')}\n\n## Purpose and reader action\n${value('purpose')}\n\n## Format and length\n${value('format')}\n\n## Approved facts and open questions\n${value('facts')}\n`;
  }
  function update() {
    revision++;
    preview.textContent = assemble();
    const empty = keys.every(key => !fields[key].value.trim());
    copy.disabled = empty;
    download.disabled = empty;
    status.textContent = '';
    fit();
  }
  function loadSources() {
    fields.organization.value = data.organization.name;
    fields.samples.value = data.organization.samples.map(s => s.text).join('\n\n');
  }
  function loadBrief() {
    fields.audience.value = '';
    fields.purpose.value = '';
    fields.format.value = current.format;
    fields.facts.value = current.facts;
    attempt.value = '';
    caseKeys.forEach(key => { document.querySelector(`#guide-${key}`).hidden = true; });
  }
  function saveCase() {
    drafts.set(current.id, {
      values: Object.fromEntries(caseKeys.map(key => [key, fields[key].value])),
      guide: caseKeys.filter(key => !document.querySelector(`#guide-${key}`).hidden),
      attempt: attempt.value
    });
  }
  function renderCase() {
    for (const key of ['audience', 'purpose', 'facts', 'before', 'after', 'check']) {
      document.querySelector(`#case-${key}`).textContent = current[key];
    }
    document.querySelector('#case-title').textContent = current.label;
    const edits = document.querySelector('#case-edits');
    edits.replaceChildren();
    current.edits.forEach(edit => {
      const li = document.createElement('li');
      for (const [label, value] of [['Before', edit.before], ['After', edit.after], ['Why', edit.why]]) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = `${label}: `;
        p.append(strong, document.createTextNode(value));
        li.append(p);
      }
      edits.append(li);
    });
    document.querySelector('#prepared-revision').open = false;
    document.querySelectorAll('[data-case]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.case === current.id)));
  }
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.case === current.id) return;
    saveCase();
    current = data.cases.find(item => item.id === button.dataset.case);
    renderCase();
    loadBrief();
    const previous = drafts.get(current.id);
    if (previous) {
      caseKeys.forEach(key => { fields[key].value = previous.values[key]; });
      previous.guide.forEach(key => { document.querySelector(`#guide-${key}`).hidden = false; });
      attempt.value = previous.attempt;
    }
    update();
    document.querySelector('#builder-state').textContent = previous ? 'Your answers for this case are restored. Shared voice rules kept.' : 'New practice brief loaded. Write its reader and next step; your shared voice rules are kept.';
  }));
  Object.entries(fields).forEach(([key, field]) => field.addEventListener('input', () => {
    update();
    document.querySelector(`#guide-${key}`).hidden = true;
    document.querySelector('#builder-state').textContent = 'Your instructions use your answers. Missing answers stay marked.';
  }));
  attempt.addEventListener('input', fit);
  document.querySelector('#use-writing-guide').addEventListener('click', () => {
    const hints = { audience: current.audience, purpose: current.purpose, voice: data.organization.voice, avoid: data.organization.avoid };
    for (const [key, value] of Object.entries(hints)) {
      if (fields[key].value.trim()) continue;
      fields[key].value = value;
      document.querySelector(`#guide-${key}`).hidden = false;
    }
    update();
    document.querySelector('#builder-state').textContent = 'Prepared hints added to blank answers. Read each one and choose what you would keep.';
  });
  document.querySelector('#clear-writing').addEventListener('click', () => {
    Object.values(fields).forEach(field => { field.value = ''; });
    attempt.value = '';
    drafts.clear();
    document.querySelectorAll('.guide-tag').forEach(tag => { tag.hidden = true; });
    document.querySelector('#prepared-patterns').open = false;
    document.querySelector('#prepared-revision').open = false;
    update();
    document.querySelector('#builder-state').textContent = 'Exercise cleared. Reset this case to restore the fictional source material.';
    fields.audience.focus();
  });
  document.querySelector('#reset-writing').addEventListener('click', () => {
    if (!fields.organization.value.trim() && !fields.samples.value.trim()) loadSources();
    loadBrief();
    drafts.delete(current.id);
    document.querySelector('#prepared-revision').open = false;
    update();
    document.querySelector('#builder-state').textContent = `Case reset: ${current.label}. Shared voice rules and other case attempts kept.`;
    fields.audience.focus();
  });
  copy.addEventListener('click', async () => {
    const text = preview.textContent;
    const atRevision = revision;
    try {
      await navigator.clipboard.writeText(text);
      if (revision === atRevision) status.textContent = 'Instructions copied. Review the facts before using them.';
    } catch {
      if (revision !== atRevision) return;
      document.querySelector('#preview-details').open = true;
      preview.focus();
      const range = document.createRange();
      range.selectNodeContents(preview);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Instructions selected. Use your browser’s Copy command.';
    }
  });
  download.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([preview.textContent], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SKILL.md';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    status.textContent = 'Download requested: SKILL.md. Keep it with your team’s writing guide.';
  });
  window.addEventListener('resize', fit);
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', fit));
  loadSources();
  loadBrief();
  renderCase();
  update();
})();
