import axios from 'axios';
import { NEWS_API_PATH } from './constants';
import { ERROR } from '@constants';

type UpdateNewsProps = {
  id: string;
  date: Date | null;
};

const updateNews = async ({ id, date }: UpdateNewsProps) => {
  try {
    await axios.patch(`${NEWS_API_PATH}/${id}`, { date });
  } catch (error) {
    alert(`${ERROR.UPDATING_NEWS} ${error}`);
  }
};

export { updateNews };
