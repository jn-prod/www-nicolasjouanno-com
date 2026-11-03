import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Toutes les pages du build, sauf les redirections : une nouvelle page est contrôlée sans
// rien ajouter ici.
const SITE = '_site';
const pages = readdirSync(SITE, { recursive: true })
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !/http-equiv=["']?refresh/i.test(readFileSync(join(SITE, file), 'utf8')))
  .map((file) => `/${file}`);

test('le build contient des pages', () => {
  expect(pages.length).toBeGreaterThan(0);
});

for (const path of pages) {
  test(`${path} respecte les invariants d'accessibilité`, async ({ page }) => {
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const resume = violations.map(({ id, impact, nodes }) => `${id} (${impact}) : ${nodes.length}`);
    expect(resume).toEqual([]);
  });
}
