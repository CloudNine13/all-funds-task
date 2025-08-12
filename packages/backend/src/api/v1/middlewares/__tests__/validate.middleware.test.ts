import { validate } from '../validate.middleware.ts';
import { Logger } from '../../../../lib/utils/loggers/index.ts';
import { z } from 'zod';

jest.mock('../../../../lib/utils/loggers/index.ts', () => ({
  Logger: {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    http: jest.fn()
  }
}));

describe('Validate Middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      body: {},
      query: {},
      params: {},
      file: null
    };

    mockResponse = {};

    mockNext = jest.fn();
  });

  test('should call next when validation passes', () => {
    const schema = z.object({
      body: z.object({
        name: z.string()
      })
    });

    mockRequest.body = { name: 'test' };

    const middleware = validate(schema);
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });

  test('should update request body when validation passes', () => {
    const schema = z.object({
      body: z.object({
        name: z.string()
      })
    });

    mockRequest.body = { name: 'test', extra: 'field' };

    const middleware = validate(schema);
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockRequest.body).toEqual({ name: 'test' });
    expect(mockNext).toHaveBeenCalledWith();
  });

  test('should update request file when validation passes', () => {
    const schema = z.object({
      file: z.object({
        originalname: z.string()
      })
    });

    mockRequest.file = { originalname: 'test.jpg', extra: 'field' };

    const middleware = validate(schema);
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockRequest.file).toEqual({ originalname: 'test.jpg' });
    expect(mockNext).toHaveBeenCalledWith();
  });

  test('should call next with error when validation fails', () => {
    const schema = z.object({
      body: z.object({
        name: z.string()
      })
    });

    mockRequest.body = { age: 25 };

    const middleware = validate(schema);
    middleware(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
    const error = mockNext.mock.calls[0][0];
    expect(error.status).toBe(400);
    expect(Logger.error).toHaveBeenCalledWith('KO: Validation error: ', expect.any(Object));
  });
});
