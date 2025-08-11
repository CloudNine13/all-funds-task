import axios from 'axios';

type GetNewsProps = {
  archived: boolean;
  page: number;
  limit: number;
};

const getNews = async ({ archived, page, limit }: GetNewsProps) => {
  try {
    const response = await axios.get('/api/v1/news', { params: { archived, page, limit } });
    return response.data;
  } catch (error) {
    alert(`Error getting News: ${error}`);
  }
};

export { getNews };
