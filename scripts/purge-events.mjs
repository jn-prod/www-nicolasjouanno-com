// Retire du dépôt les événements passés, au build quotidien. Leur historique reste dans git.
import { readdirSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const EVENT_DATE = /^event_date:\s*"?(\d{4}-\d{2}-\d{2})/mu;

export const todayInParis = (now = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(now);

export function purgeEvents(directory, today) {
  if (!existsSync(directory)) return [];
  const past = readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => {
      const date = readFileSync(join(directory, file), 'utf8').match(EVENT_DATE)?.[1];
      if (!date) console.warn(`purge-events : ${file} sans event_date, conservé.`);
      return date && date < today;
    });
  past.forEach((file) => rmSync(join(directory, file)));
  return past;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const removed = purgeEvents('_events', todayInParis());
  console.log(`purge-events : ${removed.length} événement(s) retiré(s). ${removed.join(' ')}`);
}
