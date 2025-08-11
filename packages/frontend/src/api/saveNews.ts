import axios, { AxiosError } from 'axios';

import { NEWS_API_PATH } from './constants';
import { ERROR_SAVING_NEWS } from '@constants';
import { formatValidationErrorMessage } from '@lib/utils';

type SaveNewsProps = {
  title: string;
  description: string;
  author: string;
  content: string;
  image: string;
  date: Date;
};

const saveNews = async (values: SaveNewsProps) => {
  try {
    await axios.post(NEWS_API_PATH, values);
  } catch (error) {
    const errorMessage = formatValidationErrorMessage(error as AxiosError);

    alert(`${ERROR_SAVING_NEWS} ${errorMessage}`);
  }
};

export { saveNews };
