import axios from 'axios';

type UpdateNewsProps = {
  id: string;
  date: Date | null;
};

const updateNews = async (values: UpdateNewsProps) => {
  try {
    await axios.patch(`/api/v1/news/${values.id}`, values);
  } catch (error) {
    alert(`Error updating News: ${error}`);
  }
};

export { updateNews };
