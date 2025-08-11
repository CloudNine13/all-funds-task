import axios from 'axios';

type UpdateNewsProps = {
  id: string;
  archived: boolean;
};

const updateNews = async ({ id, archived }: UpdateNewsProps) => {
  try {
    const response = await axios.patch(`/api/v1/news/${id}`, { archived });
    return response.data;
  } catch (error) {
    alert(`Error updating News: ${error}`);
  }
};

export { updateNews };
