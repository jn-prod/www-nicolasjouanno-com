import { expect, test } from '@playwright/test';

test('le tunnel prépare un e-mail puis un aperçu à copier', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/events/');
  await page.getByRole('link', { name: 'Proposer un événement' }).click();
  await expect(page).toHaveURL(/\/events\/ajouter\.html$/);

  await page.fill('#event-nom', 'Rando & test');
  await page.fill('#event-date', '2027-05-02');
  await page.fill('#event-lieu', 'Pontivy');
  await page.fill('#event-lien', 'https://exemple.fr/?a=1&b=2');
  await page.getByRole('checkbox', { name: 'VTT' }).check();
  await expect(page.locator('#event-autre')).toBeHidden();
  await page.getByRole('checkbox', { name: 'Autre' }).check();
  await page.fill('#event-autre', 'Course d’orientation');
  await page.getByRole('button', { name: "Préparer l'e-mail" }).click();
  await expect(page).toHaveURL(/\/events\/soumission-confirmee\.html$/);

  const confirm = page.locator('[data-event-confirm]');
  await expect(confirm).toBeVisible();
  await expect(page.locator('[data-event-confirm-empty]')).toBeHidden();
  await expect(page.locator('[data-event-form-address]')).toHaveText('contact@nicolasjouanno.com');

  const url = new URL(await confirm.locator('[data-event-form-link]').getAttribute('href'));
  expect(url.pathname).toBe('contact@nicolasjouanno.com');
  expect(url.searchParams.get('subject')).toBe('[Événement] Rando & test (2027-05-02)');

  const body = await page.inputValue('#event-preview-body');
  expect(body).toContain('Lien : https://exemple.fr/?a=1&b=2');
  expect(body).toContain('Discipline : VTT, Course d’orientation');
  expect(body).not.toContain('Autre');
  expect(body).not.toContain('Tarif');
  expect(decodeURIComponent(url.search.split('&body=')[1])).toBe(body);

  await page.getByRole('button', { name: 'Copier le message' }).click();
  await expect(page.locator('[data-event-form-copied]')).toHaveText('Copié.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(body);
});

for (const path of ['/events/', '/events/ajouter.html', '/events/soumission-confirmee.html']) {
  test(`${path} ne défile pas en largeur sur petit écran`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    const { scrollWidth, clientWidth } = await page.evaluate(() => {
      const { scrollWidth: scroll, clientWidth: client } = document.documentElement;
      return { scrollWidth: scroll, clientWidth: client };
    });
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
}

test('la confirmation sans e-mail préparé renvoie au formulaire', async ({ page }) => {
  await page.goto('/events/soumission-confirmee.html');
  await expect(page.locator('[data-event-confirm]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Revenir au formulaire' })).toBeVisible();
});

// Les événements changent et passent : ces tests lisent le calendrier du build, sans date en dur.
test('le calendrier affiche une semaine et navigue', async ({ page }) => {
  await page.goto('/events/');
  const select = page.locator('[data-event-calendar-week]');
  test.skip((await select.count()) === 0, 'aucun événement à venir dans ce build');

  await expect(page.locator('[data-event-calendar-controls]')).toBeVisible();
  const first = await select.inputValue();
  await expect(page.locator('[data-event-calendar-previous]')).toBeDisabled();

  await page.locator('[data-event-calendar-next]').click();
  const second = await select.inputValue();
  expect(second > first).toBe(true);
  await expect(page).toHaveURL(new RegExp(`week=${second}`));

  const inWeek = page.locator('[data-event-calendar-item]:visible');
  for (const date of await inWeek.evaluateAll((items) => items.map((item) => item.dataset.date))) {
    expect(date >= second).toBe(true);
  }

  await page.goBack();
  await expect(select).toHaveValue(first);
});

test('le filtre ne garde que la zone choisie', async ({ page }) => {
  await page.goto('/events/');
  const zones = page.locator('#event-zone option:not([value="all"])');
  test.skip((await zones.count()) === 0, 'aucune zone dans ce build');

  const zone = await zones.first().getAttribute('value');
  await page.getByText('Filtrer', { exact: true }).click();
  await page.selectOption('#event-zone', zone);
  await page.getByRole('button', { name: 'Rechercher' }).click();
  await expect(page).toHaveURL(/zone=/);
  const shown = await page.locator('[data-event-calendar-item]:visible').evaluateAll((items) => items.map((item) => item.dataset.zone));
  expect(shown.every((value) => value === zone)).toBe(true);

  await page.getByText('Filtrer', { exact: true }).click();
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(page.locator('#event-zone')).toHaveValue('all');
});

test('sans script, tous les événements à venir restent lisibles', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4174' });
  const page = await context.newPage();
  await page.goto('/events/');
  await expect(page.locator('[data-event-calendar-controls]')).toBeHidden();
  await context.close();
});

test('chaque aide du formulaire est reliée à son champ', async ({ page }) => {
  await page.goto('/events/ajouter.html');
  await expect(page.locator('#event-lien')).toHaveAttribute('type', 'url');
  const helps = page.locator('.c-event-form .c-field__help');
  expect(await helps.count()).toBeGreaterThan(0);
  for (const help of await helps.all()) {
    const id = await help.getAttribute('id');
    await expect(page.locator(`[aria-describedby~="${id}"]`)).toHaveCount(1);
  }
});

test("l'encart Événements figure sur un post, quel que soit son type", async ({ page }) => {
  for (const path of ['/pourquoi-les-etirements-sont-essentiels-vtt.html', '/comment-regler-les-suspensions-la-fourche-et-amortisseur-pour-vtt.html']) {
    await page.goto(path);
    await expect(page.locator('.c-callout a[href*="/events/"]').first()).toBeVisible();
  }
  await expect(page.locator('.c-callout')).toHaveCount(1);
  await expect(page.locator('.c-callout__title')).toHaveText('Prêt à tester tes réglages ?');
});

test('les événements portent une date de fin et un tarif structuré', async ({ page }) => {
  await page.goto('/events/');
  const events = page.locator('[itemtype="https://schema.org/SportsEvent"]');
  for (const event of await events.all()) {
    const start = await event.locator('meta[itemprop="startDate"]').getAttribute('content');
    await expect(event.locator('meta[itemprop="endDate"]')).toHaveAttribute('content', start);
  }
  for (const offer of await page.locator('[itemtype="https://schema.org/Offer"]').all()) {
    await expect(offer.locator('meta[itemprop="price"]')).toHaveAttribute('content', /^\d+(\.\d+)?$/);
    await expect(offer.locator('meta[itemprop="priceCurrency"]')).toHaveAttribute('content', 'EUR');
  }
});
