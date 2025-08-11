import axios from 'axios';
import { NEWS_API_PATH } from './constants';

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
    alert(`Error getting News: ${error}`);
  }
};

export { getNews };
