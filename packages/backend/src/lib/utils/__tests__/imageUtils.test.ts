import { processNewsImages } from '../imageUtils.ts';

describe('processNewsImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return news items unchanged when they have no image', async () => {
    const news = [
      { id: '1', title: 'News 1' },
      { id: '2', title: 'News 2' }
    ];
    const result = await processNewsImages(news as any);

    expect(result).toEqual(news);
  });
});
