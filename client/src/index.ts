/* eslint-disable no-console */
import './styles/global.scss';

import hello from './components/atoms/hello/hello';

const mountApp = (): void => {
  const testMessage = `${hello} TypeScript works second`;

  console.log(testMessage);

  const app = document.querySelector('#app');

  if (app) app.textContent = testMessage;
};

mountApp();

export default mountApp;
