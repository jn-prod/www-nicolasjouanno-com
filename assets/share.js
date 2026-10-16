function getShareData(documentObject, locationObject) {
  const canonicalUrl = documentObject.querySelector('link[rel="canonical"]')?.href;
  const description = documentObject.querySelector('meta[name="description"]')?.content;

  return {
    title: documentObject.title,
    text: description,
    url: canonicalUrl || locationObject.href,
  };
}

async function shareProfile() {
  try {
    await navigator.share(getShareData(document, window.location));
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Le partage a échoué.', error);
    }
  }
}

function initProfileShare() {
  const button = document.querySelector('[data-share-profile]');

  if (!button || typeof navigator.share !== 'function') {
    return;
  }

  button.hidden = false;
  button.addEventListener('click', shareProfile);
}

initProfileShare();
