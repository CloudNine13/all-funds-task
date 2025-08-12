import { errorHandler } from '../errorHandler.middleware.ts';
import { Logger } from '../../../../lib/utils/loggers/index.ts';

jest.mock('../../../../lib/utils/loggers/index.ts', () => ({
  Logger: {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    http: jest.fn()
  }
}));

describe('Error Handler Middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {};

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    mockNext = jest.fn();
  });

  test('should handle error with status and message', () => {
    const error = {
      message: 'Test error',
      stack: 'Error stack',
      status: 400,
      issues: undefined
    };

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('Test error');
    expect(Logger.error).toHaveBeenCalledWith('Error stack');
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Test error', details: undefined });
  });

  test('should handle error with default status 500', () => {
    const error = {
      message: 'Test error',
      stack: 'Error stack',
      status: undefined,
      issues: undefined
    };

    errorHandler(error as any, mockRequest, mockResponse, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('Test error');
    expect(Logger.error).toHaveBeenCalledWith('Error stack');
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Test error', details: undefined });
  });

  test('should handle error with issues', () => {
    const error = {
      message: 'Validation error',
      stack: 'Error stack',
      status: 400,
      issues: [{ field: 'title', message: 'Required' }]
    };

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('Validation error');
    expect(Logger.error).toHaveBeenCalledWith('Error stack');
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Validation error',
      details: [{ field: 'title', message: 'Required' }]
    });
  });
});
