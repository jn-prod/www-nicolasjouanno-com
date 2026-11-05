const EVENT_FORM_ADDRESS = 'contact@nicolasjouanno.com';
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
  const form = event.currentTarget;
  const fields = Object.fromEntries(new FormData(form).entries());
  const subject = buildSubject(fields);
  const body = buildBody(fields);
  const url = buildMailto(subject, body);
  const preview = form.parentElement.querySelector('[data-event-form-preview]');
  preview.querySelector('[data-event-form-subject]').value = subject;
  preview.querySelector('[data-event-form-body]').value = body;
  preview.querySelector('[data-event-form-link]').href = url;
  preview.querySelector('[data-event-form-copied]').textContent = '';
  preview.hidden = false;
  preview.querySelector('h3').focus();
  window.location.href = url;
}

async function onCopy(event) {
  const button = event.currentTarget;
  const field = document.getElementById(button.dataset.eventFormCopy);
  const status = button.closest('[data-event-form-preview]').querySelector('[data-event-form-copied]');
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
document.querySelectorAll('[data-event-form-copy]').forEach((button) => {
  button.addEventListener('click', onCopy);
});
