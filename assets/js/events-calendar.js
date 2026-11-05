const MAIN_WEEK_COUNT = 12;
const DAYS_PER_WEEK = 7;
const DAY_IN_MILLISECONDS = 86_400_000;
const ALL_ZONES = 'all';

const compactDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Fonctions pures
const dateFromISO = (value) => new Date(`${value}T12:00:00Z`);
const dateToISO = (date) => date.toISOString().slice(0, 10);
const addDays = (date, days) => new Date(date.getTime() + days * DAY_IN_MILLISECONDS);

function startOfWeek(value) {
  const date = dateFromISO(value);
  return dateToISO(addDays(date, 1 - (date.getUTCDay() || DAYS_PER_WEEK)));
}

function formatWeek(week) {
  const start = dateFromISO(week);
  const end = addDays(start, DAYS_PER_WEEK - 1);
  const startFormat = start.getUTCFullYear() === end.getUTCFullYear() ? compactDate : fullDate;
  return `${startFormat.format(start)} – ${fullDate.format(end)}`;
}

function formatCount(count) {
  if (count === 0) return 'aucune annonce';
  return `${count} événement${count > 1 ? 's' : ''}`;
}

function matches(item, state) {
  return item.date >= state.today && (state.zone === ALL_ZONES || item.zone === state.zone);
}

function listWeeks(items, state) {
  const firstWeek = startOfWeek(state.today);
  const mainWeeks = Array.from({ length: MAIN_WEEK_COUNT }, (_, index) =>
    dateToISO(addDays(dateFromISO(firstWeek), index * DAYS_PER_WEEK)),
  );
  const laterWeeks = items
    .filter((item) => matches(item, state))
    .map((item) => startOfWeek(item.date))
    .filter((week) => !mainWeeks.includes(week));
  return [...mainWeeks, ...new Set(laterWeeks)].sort();
}

function countByWeek(items, state) {
  return items
    .filter((item) => matches(item, state))
    .reduce((counts, item) => {
      const week = startOfWeek(item.date);
      return { ...counts, [week]: (counts[week] ?? 0) + 1 };
    }, {});
}

function readState(state, zones) {
  const parameters = new URLSearchParams(window.location.search);
  const week = parameters.get('week') ?? '';
  const zone = parameters.get('zone') ?? ALL_ZONES;
  return {
    ...state,
    week: /^\d{4}-\d{2}-\d{2}$/u.test(week) ? startOfWeek(week) : startOfWeek(state.today),
    zone: zones.includes(zone) ? zone : ALL_ZONES,
  };
}

function todayInParis() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
}

// Effets de bord
function initCalendar(root) {
  const controls = root.querySelector('[data-event-calendar-controls]');
  const weekSelect = root.querySelector('[data-event-calendar-week]');
  const previous = root.querySelector('[data-event-calendar-previous]');
  const next = root.querySelector('[data-event-calendar-next]');
  const filter = root.querySelector('[data-event-calendar-filter]');
  const form = root.querySelector('[data-event-calendar-form]');
  const zoneSelect = form.elements.zone;
  const count = root.querySelector('[data-event-calendar-count]');
  const empty = root.querySelector('[data-event-calendar-empty]');
  const days = [...root.querySelectorAll('[data-event-calendar-day]')];
  const elements = [...root.querySelectorAll('[data-event-calendar-item]')];
  const items = elements.map((element) => ({ date: element.dataset.date, zone: element.dataset.zone }));
  const zones = [...zoneSelect.options].map((option) => option.value);

  let state = readState({ today: todayInParis() }, zones);

  function renderWeekOptions(weeks) {
    const counts = countByWeek(items, state);
    weekSelect.replaceChildren(
      ...weeks.map((week) => {
        const option = document.createElement('option');
        option.value = week;
        option.textContent = `${formatWeek(week)} · ${formatCount(counts[week] ?? 0)}`;
        return option;
      }),
    );
  }

  function render() {
    const weeks = listWeeks(items, state);
    if (!weeks.includes(state.week)) state = { ...state, week: startOfWeek(state.today) };
    renderWeekOptions(weeks);
    weekSelect.value = state.week;
    zoneSelect.value = state.zone;

    const visible = items.map((item) => matches(item, state) && startOfWeek(item.date) === state.week);
    elements.forEach((element, index) => {
      element.hidden = !visible[index];
    });
    days.forEach((day) => {
      day.hidden = ![...day.querySelectorAll('[data-event-calendar-item]')].some((element) => !element.hidden);
    });

    const total = visible.filter(Boolean).length;
    empty.hidden = total > 0;
    count.textContent = `${formatCount(total)} cette semaine.`;

    const index = weeks.indexOf(state.week);
    previous.disabled = index <= 0;
    next.disabled = index >= weeks.length - 1;
    previous.setAttribute('aria-label', index > 0 ? `Semaine précédente : ${formatWeek(weeks[index - 1])}` : 'Semaine précédente');
    next.setAttribute('aria-label', index < weeks.length - 1 ? `Semaine suivante : ${formatWeek(weeks[index + 1])}` : 'Semaine suivante');
  }

  function update(changes) {
    state = { ...state, ...changes };
    render();
    const url = new URL(window.location.href);
    url.searchParams.set('week', state.week);
    if (state.zone === ALL_ZONES) url.searchParams.delete('zone');
    else url.searchParams.set('zone', state.zone);
    window.history.pushState({}, '', url);
  }

  function moveWeek(offset) {
    const weeks = listWeeks(items, state);
    const target = weeks[weeks.indexOf(state.week) + offset];
    if (target) update({ week: target });
  }

  weekSelect.addEventListener('change', () => update({ week: weekSelect.value }));
  previous.addEventListener('click', () => moveWeek(-1));
  next.addEventListener('click', () => moveWeek(1));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    update({ zone: zoneSelect.value });
    filter.removeAttribute('open');
  });
  root.querySelector('[data-event-calendar-reset]').addEventListener('click', () => {
    update({ zone: ALL_ZONES, week: startOfWeek(state.today) });
    filter.removeAttribute('open');
  });
  window.addEventListener('popstate', () => {
    state = readState(state, zones);
    render();
  });

  render();
  controls.hidden = false;
}

document.querySelectorAll('[data-event-calendar]').forEach(initCalendar);
