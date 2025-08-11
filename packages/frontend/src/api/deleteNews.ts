import axios from 'axios';

type DeleteNewsProps = {
  id: string;
};

const deleteNews = async ({ id }: DeleteNewsProps) => {
  try {
    await axios.delete(`/api/v1/news/${id}`);
  } catch (error) {
    alert(`Error deleting News: ${error}`);
  }
};

export { deleteNews };
