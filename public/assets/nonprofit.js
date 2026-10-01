(() => {
  const keys = ['role', 'task', 'context', 'format'];
  const fields = keys.map(key => document.querySelector(`#prompt-${key}`));
  const preview = document.querySelector('#assembled-prompt');
  const copy = document.querySelector('#copy-nonprofit-prompt');
  const status = document.querySelector('#prompt-status');
  const presetButtons = [...document.querySelectorAll('[data-preset]')];
  let selected = '', startingLabel = '', prompt = '', revision = 0;

  function fitFields() {
    fields.forEach(field => {
      field.style.height = 'auto';
      field.style.height = `${Math.max(112, field.scrollHeight + 2)}px`;
    });
  }

  function render() {
    revision++;
    prompt = fields.map((field, index) => field.value.trim() ? `${keys[index][0].toUpperCase() + keys[index].slice(1)}:\n${field.value.trim()}` : '').filter(Boolean).join('\n\n');
    preview.textContent = prompt || 'Your four boxes will assemble here as you type.';
    copy.disabled = !prompt;
    status.textContent = '';
    document.querySelector('#prompt-state').textContent = selected ? 'Prepared starting prompt' : prompt ? 'Your edited prompt' : 'Start with four boxes';
    presetButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.preset === selected)));
  }

  function loadPreset(id) {
    const preset = NONPROFIT_PRESETS.find(item => item.id === id);
    if (!preset) return;
    selected = id;
    startingLabel = preset.label;
    fields.forEach((field, index) => { field.value = preset[keys[index]]; });
    document.querySelector('#preset-reference').hidden = false;
    document.querySelector('#preset-source').textContent = preset.source;
    document.querySelector('#preset-review').textContent = preset.review;
    document.querySelector('#source-heading').textContent = 'Fictional source';
    render();
    fitFields();
    status.textContent = 'Prepared prompt loaded. Edit the four boxes to try a change.';
  }

  fields.forEach(field => field.addEventListener('input', () => {
    selected = '';
    if (startingLabel) document.querySelector('#source-heading').textContent = `Started from: ${startingLabel}`;
    render();fitFields();
  }));
  presetButtons.forEach(button => button.addEventListener('click', () => loadPreset(button.dataset.preset)));
  document.querySelector('#reset-nonprofit-prompt').addEventListener('click', () => {
    selected = '';
    startingLabel = '';
    fields.forEach(field => { field.value = ''; });
    document.querySelector('#preset-reference').hidden = true;
    render();
    fitFields();
    fields[0].focus();
    status.textContent = 'All four boxes cleared.';
  });
  copy.addEventListener('click', async () => {
    if (!prompt) return;
    const current = revision;
    try {
      await navigator.clipboard.writeText(prompt);
      if (current === revision) status.textContent = 'Prompt copied. Review it before pasting into your workspace.';
    } catch {
      if (current !== revision) return;
      const range = document.createRange();
      range.selectNodeContents(preview);
      const selection = getSelection();
      selection.removeAllRanges();selection.addRange(range);
      status.textContent = 'Prompt selected. Use your browser’s Copy command.';
    }
  });
  loadPreset(NONPROFIT_PRESETS[0].id);
  addEventListener('resize', fitFields);
})();
