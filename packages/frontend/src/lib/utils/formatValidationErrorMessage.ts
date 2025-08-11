import type { AxiosError } from 'axios';

const formatValidationErrorMessage = (error: AxiosError) => {
  const responseData = error.response?.data;
  if (responseData && typeof responseData === 'object' && 'details' in responseData) {
    const details = (responseData as { details: Array<{ path: Array<string>; message: string }> })
      .details;
    const messages = details.map((item) => {
      const input = item.path.find((elem) => elem !== 'body');
      return `${input?.toUpperCase()} - ${item.message}`;
    });
    return messages.join('');
  }
  return error.message || 'An unknown error occurred';
};

export { formatValidationErrorMessage };
