import { News } from '../news.model.ts';

jest.mock('../../../../config/db.ts', () => ({
  getGfsBucket: jest.fn()
}));

jest.mock('../../../../lib/utils/loggers/logger.ts', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('News Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Schema Definition', () => {
    test('should be defined', () => {
      expect(News).toBeDefined();
    });

    test('should have correct fields', () => {
      const schema = News.schema.obj;

      expect(schema.title).toBeDefined();
      expect(schema.description).toBeDefined();
      expect(schema.content).toBeDefined();
      expect(schema.date).toBeDefined();
      expect(schema.author).toBeDefined();
      expect(schema.archiveDate).toBeDefined();
      expect(schema.image).toBeDefined();
    });
  });

  describe('Indexes', () => {
    test('should have indexes on date and archiveDate fields', () => {
      const schema = News.schema;

      expect(schema.path('date').index).toBeDefined();
      expect(schema.path('archiveDate').index).toBeDefined();
    });
  });
});
