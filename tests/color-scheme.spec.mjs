import { expect, test } from '@playwright/test';

// Le navigateur intégré de X ouvre le site en mode sombre : sans schéma clair déclaré ni fond
// opaque, la page s'affiche en texte noir sur fond noir.
test.use({ colorScheme: 'dark' });

test('le site reste clair et lisible en mode sombre', async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  await page.goto('/');
  const styles = await page.evaluate(() => {
    const html = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    return { schema: html.colorScheme, fond: body.backgroundColor, texte: body.color };
  });
  expect(styles.schema).toBe('light');
  expect(styles.fond).toBe('rgb(255, 255, 255)');
  expect(styles.texte).toBe('rgb(0, 0, 0)');
});
