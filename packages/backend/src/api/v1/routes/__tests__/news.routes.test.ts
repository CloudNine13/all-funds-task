import router from '../news.routes.ts';

describe('News Routes', () => {
  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should be an express router', () => {
    expect(router).toHaveProperty('get');
    expect(router).toHaveProperty('post');
    expect(router).toHaveProperty('patch');
    expect(router).toHaveProperty('delete');
  });
});
