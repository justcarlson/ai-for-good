'use strict';
(() => {
  const sources = [
    ['A', 'Schedule', 'Saturdays 10:00 to 14:00, closed on the two public holidays in December.'],
    ['B', 'Inventory list', '38 tools, including one ladder added in March.'],
    ['C', 'Sign-in sheet', '143 tool loans so far this year.'],
    ['D', 'Membership rule', 'Free for residents, 5 dollar deposit for others.'],
    ['E', 'Volunteer log', 'Lists a safety session on 12 April, attendance not recorded.'],
    ['F', 'Donation book', 'Ladder entry dated March.']
  ];
  const claims = [
    {text: 'The library opens Saturdays at 10:00.', sources: ['A'], answer: 'supported', reason: 'A lists Saturday opening at 10:00.'},
    {text: 'It has 40 borrowable tools.', sources: ['B'], answer: 'contradicted', reason: 'B lists 38 tools, not 40.'},
    {text: 'Borrowing is free for residents.', sources: ['D'], answer: 'supported', reason: 'D states that borrowing is free for residents.'},
    {text: 'A new ladder was donated last month.', sources: ['B', 'F'], answer: 'missing', reason: 'B and F say March. The notice has no date, so we cannot establish that March was last month.'},
    {text: 'Volunteers have been trained in safe tool handling.', sources: ['E'], answer: 'missing', reason: 'E records a safety session, but no attendance. It does not establish which volunteers were trained.'},
    {text: 'The library never closes for holidays.', sources: ['A'], answer: 'contradicted', reason: 'A says it closes on two public holidays in December.'},
    {text: 'Over 200 tool loans were recorded this year.', sources: ['C'], answer: 'contradicted', reason: 'C records 143 tool loans so far this year, not over 200. This count is loans, not unique people.'}
  ];
  const classes = [
    {id: 'supported', label: 'Supported', icon: '✓', description: 'The sources establish the claim.'},
    {id: 'missing', label: 'Missing evidence', icon: '?', description: 'The sources do not establish the claim. Evidence may be incomplete.'},
    {id: 'contradicted', label: 'Contradicted', icon: '≠', description: 'A source says something different.'}
  ];
  const $ = id => document.getElementById(id);
  const make = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  let selected = 0;
  let assigned = Array(claims.length).fill(null);
  const claimButtons = [];
  const sourceCards = [];
  const binLists = {};
  const binButtons = {};
  claims.forEach((claim, index) => {
    const li = make('li');
    const button = make('button', '', 'claim-button');
    button.type = 'button';
    button.append(make('span', String(index + 1), 'claim-number'));
    const content = make('span', claim.text);
    content.append(make('span', 'Unclassified', 'claim-label'));
    button.append(content);
    button.addEventListener('click', () => {
      selected = index;
      render();
      $('status').textContent = `Claim ${index + 1} selected. Relevant sources: ${claim.sources.join(', ')}.`;
    });
    claimButtons.push(button);
    li.append(button);
    $('claims').append(li);
    const answer = make('li');
    answer.append(make('strong', `${classes.find(item => item.id === claim.answer).label}. `), document.createTextNode(claim.reason));
    $('prepared-answers').append(answer);
  });
  classes.forEach(category => {
    const panel = make('section', '', `bin ${category.id}`);
    panel.append(make('h3', `${category.icon} ${category.label}`), make('p', category.description));
    const button = make('button', `Place claim 1 here`);
    button.type = 'button';
    button.addEventListener('click', () => {
      assigned[selected] = category.id;
      render();
      $('status').textContent = `Claim ${selected + 1}: ${category.label}. ${assigned.filter(Boolean).length} of 7 classified.`;
    });
    binButtons[category.id] = button;
    const list = make('ul');
    binLists[category.id] = list;
    panel.append(button, list);
    $('bins').append(panel);
  });
  sources.forEach(([letter, title, body]) => {
    const card = make('details', '', 'source-card');
    const summary = make('summary', `${letter} · ${title}`);
    summary.append(make('span', '', 'source-relevance'));
    card.append(summary, make('p', body));
    sourceCards.push(card);
    $('sources').append(card);
  });
  function render() {
    claimButtons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === selected));
      button.querySelector('.claim-label').textContent = assigned[i] ? classes.find(item => item.id === assigned[i]).label : 'Unclassified';
    });
    $('selected-claim').textContent = `Selected claim ${selected + 1}: ${claims[selected].text}`;
    $('progress').textContent = `${assigned.filter(Boolean).length} of 7 claims classified`;
    classes.forEach(category => {
      const button = binButtons[category.id];
      button.textContent = `Place claim ${selected + 1} here`;
      button.setAttribute('aria-label', `Classify claim ${selected + 1} as ${category.label}`);
      button.setAttribute('aria-pressed', String(assigned[selected] === category.id));
      binLists[category.id].replaceChildren();
      assigned.forEach((value, i) => {
        if (value === category.id) binLists[category.id].append(make('li', `${i + 1}. ${claims[i].text}`));
      });
    });
    sourceCards.forEach((card, i) => {
      const relevant = claims[selected].sources.includes(sources[i][0]);
      card.dataset.relevant = String(relevant);
      card.open = relevant;
      card.querySelector('.source-relevance').textContent = relevant ? `Relevant to claim ${selected + 1}` : 'Other source';
    });
  }
  $('reveal').addEventListener('click', () => {
    $('prepared').hidden = !$('prepared').hidden;
    const shown = !$('prepared').hidden;
    $('reveal').setAttribute('aria-expanded', String(shown));
    $('reveal').textContent = shown ? 'Hide prepared check' : 'Reveal prepared check';
    $('status').textContent = shown ? 'Prepared check shown below the controls. Your classifications are unchanged.' : 'Prepared check hidden.';
  });
  $('reset').addEventListener('click', () => {
    selected = 0;
    assigned = Array(claims.length).fill(null);
    $('prepared').hidden = true;
    $('reveal').textContent = 'Reveal prepared check';
    $('reveal').setAttribute('aria-expanded', 'false');
    render();
    $('status').textContent = 'Board reset. All seven claims are unclassified. Prepared check hidden.';
  });
  let printDetails = [];
  window.addEventListener('beforeprint', () => {
    printDetails = Array.from(document.querySelectorAll('details'), detail => [detail, detail.open]);
    printDetails.forEach(([detail]) => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => printDetails.forEach(([detail, open]) => { detail.open = open; }));
  $('print').addEventListener('click', () => window.print());
  render();
})();
