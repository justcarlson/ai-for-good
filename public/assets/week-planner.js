'use strict';
(() => {
  const tasks = [
    {name: 'Reply to 12 emails', hours: 3, due: 0, tag: 'must'},
    {name: 'Update the volunteer rota', hours: 2, due: 2, tag: 'must'},
    {name: 'Prepare Thursday workshop slides', hours: 5, due: 3, tag: 'must'},
    {name: 'Print posters', hours: 1, due: 1, tag: 'flexible'},
    {name: 'Training call with new volunteer', hours: 2, due: null, tag: 'helps others · flexible'},
    {name: 'Tidy the storage room', hours: 4, due: null, tag: 'flexible'},
    {name: 'Monthly report', hours: 6, due: 4, tag: 'must'},
    {name: 'Fix website event page', hours: 3, due: 2, tag: 'flexible'},
    {name: 'Meet the neighbor group', hours: 2, due: 3, tag: 'helps others'},
    {name: 'Order supplies', hours: 1, due: 1, tag: 'must'}
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const capacities = [5, 6, 5, 6, 5];
  const sample = [
    [3, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 5, 0, 0, 0],
    [1, 0, 0, 0, 0], [0, 0, 1, 0, 1], [0, 0, 0, 0, 0],
    [0, 0, 0, 4, 2], [0, 0, 3, 0, 0], [0, 0, 0, 2, 0], [1, 0, 0, 0, 0]
  ];
  const $ = id => document.getElementById(id);
  const sum = values => values.reduce((a, b) => a + b, 0);
  const make = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const empty = () => tasks.map(() => days.map(() => 0));
  let plan = empty();
  let selectedTask = 0;
  let selectedDay = 0;
  let sampleLoaded = false;
  const taskButtons = [];
  const dayButtons = [];
  tasks.forEach((task, i) => {
    const button = make('button', '', 'task-card');
    button.type = 'button';
    button.append(make('strong', task.name), make('span', `${task.hours}h · ${task.due === null ? 'No fixed deadline' : `Due ${days[task.due]}`} · ${task.tag}`), make('span', '', 'task-left'));
    button.addEventListener('click', () => {
      selectedTask = i;
      render();
      announceSelection();
    });
    taskButtons.push(button);
    $('tasks').append(button);
    const option = make('option', task.name);
    option.value = String(i);
    $('tradeoff-task').append(option);
  });
  days.forEach((day, i) => {
    const button = make('button', '', 'day-button');
    button.type = 'button';
    const meter = make('meter');
    meter.min = 0;
    meter.max = capacities[i];
    meter.setAttribute('aria-label', `${day} hours used`);
    button.append(make('strong', day), make('span', '', 'day-used'), meter, make('span', '', 'day-warning'));
    button.addEventListener('click', () => {
      selectedDay = i;
      render();
      announceSelection();
    });
    dayButtons.push(button);
    $('days').append(button);
  });
  function announceSelection() {
    $('status').textContent = `${tasks[selectedTask].name}, ${days[selectedDay]}. ${plan[selectedTask][selectedDay]} hours here; ${tasks[selectedTask].hours - sum(plan[selectedTask])} left to place.`;
  }
  function render() {
    const used = days.map((_, day) => sum(plan.map(row => row[day])));
    const totalUsed = sum(used);
    const totalCapacity = sum(capacities);
    taskButtons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === selectedTask));
      button.querySelector('.task-left').textContent = `${sum(plan[i])}/${tasks[i].hours}h placed`;
    });
    dayButtons.forEach((button, day) => {
      button.setAttribute('aria-pressed', String(day === selectedDay));
      button.querySelector('.day-used').textContent = `${used[day]}/${capacities[day]}h used`;
      button.querySelector('meter').value = Math.min(used[day], capacities[day]);
      button.querySelector('.day-warning').textContent = used[day] > capacities[day] ? `${used[day] - capacities[day]}h over capacity` : `${capacities[day] - used[day]}h available`;
    });
    $('selection').textContent = `${tasks[selectedTask].name} → ${days[selectedDay]}`;
    $('add').disabled = sum(plan[selectedTask]) >= tasks[selectedTask].hours;
    $('remove').disabled = plan[selectedTask][selectedDay] === 0;
    $('totals').replaceChildren();
    const stats = [[`${totalUsed}/${totalCapacity}h`, 'scheduled'], [`${sum(tasks.map(task => task.hours)) - totalUsed}h`, 'unscheduled'], [`${sum(used.map((hours, day) => Math.max(0, capacities[day] - hours)))}h`, 'space on available days']];
    stats.forEach(([value, label]) => {
      const stat = make('span');
      stat.append(make('strong', value), document.createTextNode(label));
      $('totals').append(stat);
    });
    $('allocations').replaceChildren();
    tasks.forEach((task, i) => {
      const row = make('tr');
      const heading = make('th', task.name);
      heading.scope = 'row';
      row.append(heading);
      plan[i].forEach(hours => row.append(make('td', String(hours))));
      row.append(make('td', String(task.hours - sum(plan[i]))));
      $('allocations').append(row);
    });
    $('day-totals').replaceChildren();
    const heading = make('th', 'Used / available');
    heading.scope = 'row';
    $('day-totals').append(heading);
    used.forEach((hours, day) => $('day-totals').append(make('td', `${hours} / ${capacities[day]}`)));
    $('day-totals').append(make('td', String(sum(tasks.map(task => task.hours)) - totalUsed)));
    const conflicts = [];
    used.forEach((hours, day) => {
      if (hours > capacities[day]) conflicts.push(`${days[day]} is ${hours - capacities[day]}h over capacity (${hours}/${capacities[day]}h).`);
    });
    tasks.forEach((task, i) => {
      if (task.due === null) return;
      const late = sum(plan[i].slice(task.due + 1));
      if (late) conflicts.push(`${task.name}: ${late}h placed after its ${days[task.due]} deadline.`);
      const unplaced = task.hours - sum(plan[i]);
      if (unplaced) conflicts.push(`${task.name}: ${unplaced}h still need a place by ${days[task.due]}.`);
    });
    $('conflicts').replaceChildren();
    (conflicts.length ? conflicts : ['No capacity or deadline conflicts.']).forEach(text => $('conflicts').append(make('li', text)));
    $('unscheduled').replaceChildren();
    tasks.forEach((task, i) => {
      const left = task.hours - sum(plan[i]);
      if (left) $('unscheduled').append(make('li', `${task.name}: ${left}h (${task.tag}).`));
    });
    if (!$('unscheduled').children.length) $('unscheduled').append(make('li', 'All task hours are placed.'));
  }
  function markEdited() {
    if (sampleLoaded) $('prepared-state').textContent = 'You have edited the prepared suggestion. Checks reflect your current plan.';
  }
  function changeHour(delta) {
    if (delta > 0 && sum(plan[selectedTask]) >= tasks[selectedTask].hours) return;
    if (delta < 0 && plan[selectedTask][selectedDay] === 0) return;
    plan[selectedTask][selectedDay] += delta;
    markEdited();
    render();
    const dayUsed = sum(plan.map(row => row[selectedDay]));
    const warnings = [];
    if (dayUsed > capacities[selectedDay]) warnings.push(`${days[selectedDay]} is ${dayUsed - capacities[selectedDay]}h over capacity.`);
    if (tasks[selectedTask].due !== null && selectedDay > tasks[selectedTask].due && plan[selectedTask][selectedDay] > 0) warnings.push(`Past the ${days[tasks[selectedTask].due]} deadline.`);
    $('status').textContent = `${delta > 0 ? 'Added' : 'Removed'} 1 hour. ${tasks[selectedTask].name}: ${plan[selectedTask][selectedDay]}h on ${days[selectedDay]}. ${warnings.join(' ')}`;
  }
  function updateNote() {
    const complete = $('tradeoff-task').value !== '' && $('reason').value.trim() && $('question').value.trim();
    $('note-status').textContent = complete ? 'Tradeoff and question recorded. Confirm them with a person before changing a real plan.' : 'Choose a task, add a reason and write one question.';
  }
  $('add').addEventListener('click', () => changeHour(1));
  $('remove').addEventListener('click', () => changeHour(-1));
  ['tradeoff-task', 'tradeoff-action', 'reason', 'question'].forEach(id => $(id).addEventListener('input', () => { updateNote(); markEdited(); }));
  $('prepared').addEventListener('click', () => {
    plan = sample.map(row => row.slice());
    sampleLoaded = true;
    $('tradeoff-task').value = '5';
    $('tradeoff-action').value = 'delay';
    $('reason').value = 'Postpone the 4-hour storage tidy to protect deadlines and keep 2 hours as a buffer.';
    $('question').value = 'Can the storage tidy wait, and can the rota, training and report be split across days?';
    $('prepared-state').textContent = 'Prepared suggestion loaded. Change any allocation to explore another plan.';
    render();
    updateNote();
    const used = sum(plan.map(sum));
    $('status').textContent = `Prepared suggestion loaded. ${used} of ${sum(capacities)} hours scheduled; ${sum(tasks.map(task => task.hours)) - used} hours unscheduled. Checks updated below.`;
  });
  $('reset').addEventListener('click', () => {
    plan = empty();
    selectedTask = 0;
    selectedDay = 0;
    sampleLoaded = false;
    $('tradeoff-task').value = '';
    $('tradeoff-action').value = 'delay';
    $('reason').value = '';
    $('question').value = '';
    $('prepared-state').textContent = 'This button replaces the current plan and tradeoff note.';
    render();
    updateNote();
    $('status').textContent = 'Week reset. All allocations and tradeoff notes cleared.';
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
