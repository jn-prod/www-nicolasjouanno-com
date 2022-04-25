import mountApp from './index';
import createApp from './utils/test.utils';

describe('index', () => {
  beforeEach(() => {
    createApp();
  });
  test('testMessage', () => {
    mountApp();

    expect(document.body).toMatchSnapshot();
  });
});
