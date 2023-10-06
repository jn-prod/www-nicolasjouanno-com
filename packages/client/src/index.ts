/* eslint-disable no-console */
import { setup } from 'icons';
import 'styles/dist/global.css';
import 'icons/src/icons.css';

import { messages } from './locales';

const run = (): void => {
  setup();
  const testMessage = messages.welcome;

  console.log(testMessage);

  const app = document.querySelector('#app');

  if (app) app.textContent = testMessage;
};

run();

export default run;
