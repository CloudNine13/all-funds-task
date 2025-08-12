import { getNews, archiveNews, saveNews, deleteNews } from '../news.controller.ts';
import { newsService } from '../../services/news.service.ts';
import { processNewsImages, uploadImageToGridFS } from '../../../../lib/utils/imageUtils.ts';

jest.mock('../../../../lib/utils/loggers/index.ts', () => ({
  Logger: {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    http: jest.fn()
  }
}));

jest.mock('../../services/news.service.ts', () => ({
  newsService: {
    getNews: jest.fn(),
    archiveNews: jest.fn(),
    saveNews: jest.fn(),
    deleteNews: jest.fn()
  }
}));

jest.mock('../../../../lib/utils/imageUtils.ts', () => ({
  processNewsImages: jest.fn(),
  uploadImageToGridFS: jest.fn()
}));

describe('News Controller', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      query: {},
      body: {},
      params: {},
      file: null
    };

    mockResponse = {
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };

    mockNext = jest.fn();
  });

  describe('getNews', () => {
    test('should fetch news with default parameters', async () => {
      const mockNews = [{ id: '1', title: 'Test News' }];
      const mockNewsWithImages = [{ id: '1', title: 'Test News', imageUrl: 'test.jpg' }];
      const mockPages = 2;

      (newsService.getNews as jest.Mock).mockResolvedValue({ news: mockNews, pages: mockPages });
      (processNewsImages as jest.Mock).mockResolvedValue(mockNewsWithImages);

      await getNews(mockRequest, mockResponse, mockNext);

      expect(newsService.getNews).toHaveBeenCalledWith(false, 1, 5);
      expect(processNewsImages).toHaveBeenCalledWith(mockNews);
      expect(mockResponse.json).toHaveBeenCalledWith({
        news: mockNewsWithImages,
        pages: mockPages
      });
    });

    test('should fetch archived news with custom parameters', async () => {
      mockRequest.query = { archived: 'true', page: '2', limit: '10' };
      const mockNews = [{ id: '1', title: 'Archived News' }];
      const mockNewsWithImages = [{ id: '1', title: 'Archived News', imageUrl: 'test.jpg' }];
      const mockPages = 1;

      (newsService.getNews as jest.Mock).mockResolvedValue({ news: mockNews, pages: mockPages });
      (processNewsImages as jest.Mock).mockResolvedValue(mockNewsWithImages);

      await getNews(mockRequest, mockResponse, mockNext);

      expect(newsService.getNews).toHaveBeenCalledWith(true, 2, 10);
      expect(processNewsImages).toHaveBeenCalledWith(mockNews);
      expect(mockResponse.json).toHaveBeenCalledWith({
        news: mockNewsWithImages,
        pages: mockPages
      });
    });

    test('should call next with error when service throws', async () => {
      const error = new Error('Database error');
      (newsService.getNews as jest.Mock).mockRejectedValue(error);

      await getNews(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('archiveNews', () => {
    test('should archive news successfully', async () => {
      mockRequest.params = { id: 'test-id' };
      mockRequest.body = { date: new Date() };

      await archiveNews(mockRequest, mockResponse, mockNext);

      expect(newsService.archiveNews).toHaveBeenCalledWith('test-id', mockRequest.body.date);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should call next with error when service throws', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: 'test-id' };
      (newsService.archiveNews as jest.Mock).mockRejectedValue(error);

      await archiveNews(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('saveNews', () => {
    test('should save news without image', async () => {
      mockRequest.body = {
        title: 'Test News',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        date: new Date()
      };

      await saveNews(mockRequest, mockResponse, mockNext);

      expect(newsService.saveNews).toHaveBeenCalledWith({
        title: 'Test News',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        date: mockRequest.body.date,
        image: undefined
      });
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should save news with image', async () => {
      mockRequest.body = {
        title: 'Test News',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        date: new Date()
      };

      mockRequest.file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test')
      };

      (uploadImageToGridFS as jest.Mock).mockResolvedValue('image-id');

      await saveNews(mockRequest, mockResponse, mockNext);

      expect(uploadImageToGridFS).toHaveBeenCalledWith(mockRequest.file);
      expect(newsService.saveNews).toHaveBeenCalledWith({
        title: 'Test News',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        date: mockRequest.body.date,
        image: 'image-id'
      });
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should call next with error when service throws', async () => {
      const error = new Error('Database error');
      mockRequest.body = { title: 'Test News' };
      (newsService.saveNews as jest.Mock).mockRejectedValue(error);

      await saveNews(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteNews', () => {
    test('should delete news successfully', async () => {
      mockRequest.params = { id: 'test-id' };

      await deleteNews(mockRequest, mockResponse, mockNext);

      expect(newsService.deleteNews).toHaveBeenCalledWith('test-id');
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should call next with error when service throws', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: 'test-id' };
      (newsService.deleteNews as jest.Mock).mockRejectedValue(error);

      await deleteNews(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
