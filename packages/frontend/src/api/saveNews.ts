import axios, { AxiosError } from 'axios';

import { NEWS_API_PATH } from './constants';
import { ERROR, MULTIPART_FORM_DATA_HEADERS } from '@constants';
import { formatValidationErrorMessage } from '@lib/utils';
import type { AddDataType } from '@lib/types';

const saveNews = async (values: AddDataType) => {
  try {
    const value = { ...values, date: new Date() };

    await axios.post(NEWS_API_PATH, value, {
      headers: MULTIPART_FORM_DATA_HEADERS
    });
  } catch (error) {
    const errorMessage = formatValidationErrorMessage(error as AxiosError);
    alert(`${ERROR.SAVING_NEWS} ${errorMessage}`);
  }
};

export { saveNews };
