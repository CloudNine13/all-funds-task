import type { AxiosError } from 'axios';

import { UNKNOWN_ERROR_MESSAGE, VALIDATION_PATH_BODY } from './constants';

const formatValidationErrorMessage = (error: AxiosError) => {
  const responseData = error.response?.data;
  if (responseData && typeof responseData === 'object' && 'details' in responseData) {
    const details = (responseData as { details: Array<{ path: Array<string>; message: string }> })
      .details;
    const messages = details.map((item) => {
      const input = item.path.find((elem) => elem !== VALIDATION_PATH_BODY);
      return `${input?.toUpperCase()} - ${item.message}`;
    });
    return messages.join('');
  }
  return error.message || UNKNOWN_ERROR_MESSAGE;
};

export { formatValidationErrorMessage };
