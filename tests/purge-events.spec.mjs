import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { purgeEvents } from '../scripts/purge-events.mjs';

test('la purge retire les événements passés et garde le jour même', () => {
  const directory = mkdtempSync(join(tmpdir(), 'events-'));
  const write = (name, date) => writeFileSync(join(directory, name), `---\ntitle: "x"\n${date}---\n`);
  write('hier.md', 'event_date: 2026-11-04\n');
  write('jour.md', 'event_date: 2026-11-05\n');
  write('demain.md', 'event_date: 2026-11-06\n');
  write('sans-date.md', '');

  expect(purgeEvents(directory, '2026-11-05')).toEqual(['hier.md']);
  expect(existsSync(join(directory, 'hier.md'))).toBe(false);
  expect(existsSync(join(directory, 'jour.md'))).toBe(true);
  expect(existsSync(join(directory, 'demain.md'))).toBe(true);
  expect(existsSync(join(directory, 'sans-date.md'))).toBe(true);
  rmSync(directory, { recursive: true });
});

test('la purge accepte un dossier absent', () => {
  expect(purgeEvents(join(tmpdir(), 'dossier-absent-events'), '2026-11-05')).toEqual([]);
});
