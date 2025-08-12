import {
  saveNewsSchema,
  archiveNewsSchema,
  getNewsSchema,
  deleteNewsSchema
} from '../news.schema.ts';
import { IMAGE, QUERY_PARAMS } from '../../constants.ts';

describe('News Schemas', () => {
  describe('saveNewsSchema', () => {
    test('should validate correct save news data with file', () => {
      const data = {
        body: {
          title: 'Test News',
          description: 'Test Description',
          content: 'Test Content',
          author: 'Test Author',
          date: '2023-01-01T00:00:00.000Z'
        },
        file: {
          fieldname: 'image',
          originalname: 'test.jpg',
          encoding: '7bit',
          mimetype: IMAGE.MIME_TYPES.PNG,
          size: 1024,
          buffer: Buffer.from('test')
        }
      };

      expect(() => saveNewsSchema.parse(data)).not.toThrow();
    });

    test('should reject save news data with invalid image type', () => {
      const data = {
        body: {
          title: 'Test News',
          description: 'Test Description',
          content: 'Test Content',
          author: 'Test Author',
          date: '2023-01-01T00:00:00.000Z'
        },
        file: {
          fieldname: 'image',
          originalname: 'test.txt',
          encoding: '7bit',
          mimetype: 'text/plain',
          size: 1024,
          buffer: Buffer.from('test')
        }
      };

      expect(() => saveNewsSchema.parse(data)).toThrow();
    });
  });

  describe('archiveNewsSchema', () => {
    test('should validate correct archive news data', () => {
      const data = {
        params: {
          id: '507f1f77bcf86cd799439011'
        },
        body: {
          date: '2023-01-01T00:00:00.000Z'
        }
      };

      expect(() => archiveNewsSchema.parse(data)).not.toThrow();
    });

    test('should validate correct archive news data with null date', () => {
      const data = {
        params: {
          id: '507f1f77bcf86cd799439011'
        },
        body: {
          date: null
        }
      };

      expect(() => archiveNewsSchema.parse(data)).not.toThrow();
    });

    test('should reject archive news data with invalid id length', () => {
      const data = {
        params: {
          id: 'invalid-id'
        },
        body: {
          date: '2023-01-01T00:00:00.000Z'
        }
      };

      expect(() => archiveNewsSchema.parse(data)).toThrow();
    });
  });

  describe('getNewsSchema', () => {
    test('should validate correct get news data', () => {
      const data = {
        query: {
          [QUERY_PARAMS.ARCHIVED]: 'true',
          [QUERY_PARAMS.PAGE]: '1',
          [QUERY_PARAMS.LIMIT]: '5'
        }
      };

      expect(() => getNewsSchema.parse(data)).not.toThrow();
    });

    test('should validate get news data with no query params', () => {
      const data = {
        query: {}
      };

      expect(() => getNewsSchema.parse(data)).not.toThrow();
    });
  });

  describe('deleteNewsSchema', () => {
    test('should validate correct delete news data', () => {
      const data = {
        params: {
          id: '507f1f77bcf86cd799439011'
        }
      };

      expect(() => deleteNewsSchema.parse(data)).not.toThrow();
    });

    test('should reject delete news data with invalid id length', () => {
      const data = {
        params: {
          id: 'invalid-id'
        }
      };

      expect(() => deleteNewsSchema.parse(data)).toThrow();
    });
  });
});
