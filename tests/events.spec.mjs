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
  expect(body).not.toContain('Tarif');
  expect(decodeURIComponent(url.search.split('&body=')[1])).toBe(body);

  await page.getByRole('button', { name: 'Copier le message' }).click();
  await expect(page.locator('[data-event-form-copied]')).toHaveText('Copié.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(body);
});

test('la confirmation sans e-mail préparé renvoie au formulaire', async ({ page }) => {
  await page.goto('/events/soumission-confirmee.html');
  await expect(page.locator('[data-event-confirm]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Revenir au formulaire' })).toBeVisible();
});
