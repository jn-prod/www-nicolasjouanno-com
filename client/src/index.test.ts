import run from './index';
import createApp from './utils/test.utils';

describe('index', () => {
  beforeEach(() => {
    createApp();
  });
  test('testMessage', () => {
    run();

    expect(document.body).toMatchSnapshot();
  });
});
