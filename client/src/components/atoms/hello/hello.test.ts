import hello from './hello';

describe('index', () => {
  test('hello', () => {
    expect(hello).toBe('hello');
  });
});
