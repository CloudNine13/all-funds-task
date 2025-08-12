import upload from '../upload.middleware.ts';

describe('Upload Middleware', () => {
  test('should be defined', () => {
    expect(upload).toBeDefined();
  });

  test('should have single method for file upload', () => {
    expect(upload.single).toBeDefined();
    expect(typeof upload.single).toBe('function');
  });
});
