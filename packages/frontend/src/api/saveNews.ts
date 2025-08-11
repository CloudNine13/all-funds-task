import axios from 'axios';

type GetNewsProps = {
  title: string;
  description: string;
  author: string;
  content: string;
  image: string;
  date: Date;
};

const saveNews = async (values: GetNewsProps) => {
  try {
    await axios.post('/api/v1/news', values);
  } catch (error) {
    alert(`Error getting News: ${error}`);
  }
};

export { saveNews };
