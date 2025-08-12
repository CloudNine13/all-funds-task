import axios from 'axios';
import { NEWS_API_PATH } from './constants';
import { ERROR } from '@constants';

type GetNewsProps = {
  archived: boolean;
  page: number;
  limit: number;
};

const getNews = async (values: GetNewsProps) => {
  try {
    const response = await axios.get(NEWS_API_PATH, { params: values });
    return response.data;
  } catch (error) {
    alert(`${ERROR.GETTING_NEWS} ${error}`);
  }
};

export { getNews };
