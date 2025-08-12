import axios from 'axios';
import { NEWS_API_PATH } from './constants';
import { ERROR } from '@constants';

type DeleteNewsProps = {
  id: string;
};

const deleteNews = async ({ id }: DeleteNewsProps) => {
  try {
    await axios.delete(`${NEWS_API_PATH}/${id}`);
  } catch (error) {
    alert(`${ERROR.DELETING_NEWS} ${error}`);
  }
};

export { deleteNews };
