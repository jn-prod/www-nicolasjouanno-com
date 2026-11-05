const EVENT_FORM_ADDRESS = 'contact@nicolasjouanno.com';
const EVENT_FORM_CONFIRM_URL = '/events/soumission-confirmee.html';
const EVENT_FORM_STORAGE_KEY = 'event-form-draft';
const COPIED_MESSAGE = 'Copié.';
const COPY_FAILED_MESSAGE = 'Texte sélectionné : copiez-le avec votre clavier ou le menu de votre téléphone.';

// Fonctions pures
function buildSubject(fields) {
  return `[Événement] ${fields.Nom} (${fields.Date})`;
}

function buildBody(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([name, value]) => `${name} : ${value}`)
    .join('\n');
}

function buildMailto(subject, body) {
  return `mailto:${EVENT_FORM_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Effets de bord
function onSubmit(event) {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
  const subject = buildSubject(fields);
  const body = buildBody(fields);
  sessionStorage.setItem(EVENT_FORM_STORAGE_KEY, JSON.stringify({ subject, body }));
  window.location.href = EVENT_FORM_CONFIRM_URL;
}

function renderConfirmation(confirm) {
  const draft = JSON.parse(sessionStorage.getItem(EVENT_FORM_STORAGE_KEY) ?? 'null');
  if (!draft) return;
  confirm.querySelector('[data-event-form-subject]').value = draft.subject;
  confirm.querySelector('[data-event-form-body]').value = draft.body;
  confirm.querySelector('[data-event-form-link]').href = buildMailto(draft.subject, draft.body);
  confirm.querySelector('[data-event-form-address]').textContent = EVENT_FORM_ADDRESS;
  confirm.hidden = false;
  document.querySelector('[data-event-confirm-empty]').hidden = true;
}

async function onCopy(event) {
  const button = event.currentTarget;
  const field = document.getElementById(button.dataset.eventFormCopy);
  const status = button.closest('[data-event-confirm]').querySelector('[data-event-form-copied]');
  field.select();
  try {
    await navigator.clipboard.writeText(field.value);
    status.textContent = COPIED_MESSAGE;
  } catch {
    status.textContent = COPY_FAILED_MESSAGE;
  }
}

document.querySelectorAll('[data-event-form]').forEach((form) => {
  form.addEventListener('submit', onSubmit);
});
document.querySelectorAll('[data-event-confirm]').forEach(renderConfirmation);
document.querySelectorAll('[data-event-form-copy]').forEach((button) => {
  button.addEventListener('click', onCopy);
});
