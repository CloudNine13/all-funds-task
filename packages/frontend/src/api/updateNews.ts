import axios from 'axios';
import { NEWS_API_PATH } from './constants';

type UpdateNewsProps = {
  id: string;
  date: Date | null;
};

const updateNews = async ({ id, date }: UpdateNewsProps) => {
  try {
    await axios.patch(`${NEWS_API_PATH}/${id}`, { date });
  } catch (error) {
    alert(`Error updating News: ${error}`);
  }
};

export { updateNews };
