import { newsService } from '../news.service.ts';
import type { NewsBaseType } from '../../../../lib/types/NewsType.ts';

jest.mock('../../../../lib/utils/loggers/index.ts', () => ({
  Logger: {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('../../models/news.model.ts', () => {
  const MockNews: any = jest.fn().mockImplementation(() => {
    return { save: jest.fn() };
  });

  MockNews.find = jest.fn();
  MockNews.countDocuments = jest.fn();
  MockNews.findByIdAndUpdate = jest.fn();
  MockNews.findByIdAndDelete = jest.fn();

  return {
    News: MockNews
  };
});

describe('NewsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNews', () => {
    test('should fetch active news with default pagination', async () => {
      const mockNews = [{ id: '1', title: 'Test News' }];
      const mockTotal = 10;

      const { News } = (await import('../../models/news.model.ts')) as any;

      News.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockNews)
      });

      News.countDocuments.mockResolvedValue(mockTotal);

      const result = await newsService.getNews(false, 1, 5);

      expect(result).toEqual({
        news: mockNews,
        pages: 2
      });

      expect(News.find).toHaveBeenCalledWith({ archiveDate: null });
      expect(News.countDocuments).toHaveBeenCalledWith({ archiveDate: null });
    });

    test('should fetch archived news when archived is true', async () => {
      const mockNews = [{ id: '1', title: 'Archived News' }];
      const mockTotal = 5;

      const { News } = (await import('../../models/news.model.ts')) as any;

      News.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockNews)
      });

      News.countDocuments.mockResolvedValue(mockTotal);

      const result = await newsService.getNews(true, 1, 5);

      expect(result).toEqual({
        news: mockNews,
        pages: 1
      });

      expect(News.find).toHaveBeenCalledWith({ archiveDate: { $ne: null } });
      expect(News.countDocuments).toHaveBeenCalledWith({ archiveDate: { $ne: null } });
    });
  });

  describe('archiveNews', () => {
    test('should call findByIdAndUpdate with correct parameters', async () => {
      const id = 'test-id';
      const date = new Date();

      const { News } = (await import('../../models/news.model.ts')) as any;
      News.findByIdAndUpdate.mockResolvedValue({ id });

      await newsService.archiveNews(id, date);

      expect(News.findByIdAndUpdate).toHaveBeenCalledWith(id, { archiveDate: date });
    });

    test('should handle null date for unarchiving', async () => {
      const id = 'test-id';

      const { News } = (await import('../../models/news.model.ts')) as any;
      News.findByIdAndUpdate.mockResolvedValue({ id });

      await newsService.archiveNews(id, null);

      expect(News.findByIdAndUpdate).toHaveBeenCalledWith(id, { archiveDate: null });
    });
  });

  describe('deleteNews', () => {
    test('should call findByIdAndDelete with correct id', async () => {
      const id = 'test-id';

      const { News } = (await import('../../models/news.model.ts')) as any;
      News.findByIdAndDelete.mockResolvedValue({ id });

      await newsService.deleteNews(id);

      expect(News.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe('saveNews', () => {
    test('should create and save a new news item', async () => {
      const newsValues: NewsBaseType = {
        title: 'Test News',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        date: new Date()
      };

      const { News } = (await import('../../models/news.model.ts')) as any;

      const mockSave = jest.fn().mockResolvedValue({});
      News.mockImplementationOnce(() => {
        return { save: mockSave };
      });

      await newsService.saveNews(newsValues);

      expect(News).toHaveBeenCalledWith(expect.objectContaining(newsValues));
      expect(mockSave).toHaveBeenCalled();
    });
  });
});
