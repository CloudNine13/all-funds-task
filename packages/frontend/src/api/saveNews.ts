import axios from 'axios';

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
    await axios.post('/api/v1/news', values);
  } catch (error) {
    alert(`Error saving News: ${error}`);
  }
};

export { saveNews };
