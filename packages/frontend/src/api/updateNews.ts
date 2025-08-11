import axios from 'axios';

type UpdateNewsProps = {
  id: string;
  date: Date | null;
};

const updateNews = async ({ id, date }: UpdateNewsProps) => {
  try {
    await axios.patch(`/api/v1/news/${id}`, { id, date });
  } catch (error) {
    alert(`Error updating News: ${error}`);
  }
};

export { updateNews };
