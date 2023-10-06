/* eslint-disable no-console */
import {setup} from 'icons';
import './styles/global.scss';
import { messages } from './locales';

/**
 * Atoms
 */
import hello from './components/atoms/hello/hello';

import './app/app';

const run = (): void => {
  setup();
  const testMessage = `${hello} ${messages.welcome}`;

  console.log(testMessage);

  const app = document.querySelector('#app');

  if (app) app.textContent = testMessage;
};

run();

export default run;
