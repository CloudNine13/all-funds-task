import { News } from '../models/news.model.ts';

class NewsService {
  async getNews(archived: boolean, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const query = archived ? { archiveDate: { $ne: null } } : { archiveDate: null };

    const news = await News.find(query).skip(skip).limit(limit).sort({ date: -1 }).lean();
    const total = await News.countDocuments(query);

    return {
      news,
      total,
      pages: Math.ceil(total / limit)
    };
  }
}

const newsService = new NewsService();

export { newsService };
