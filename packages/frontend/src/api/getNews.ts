import axios from 'axios';

type GetNewsProps = {
  archived: boolean;
  page: number;
  limit: number;
};

const getNews = async (values: GetNewsProps) => {
  try {
    const response = await axios.get('/api/v1/news', { params: values });
    return response.data;
  } catch (error) {
    alert(`Error getting News: ${error}`);
  }
};

export { getNews };
