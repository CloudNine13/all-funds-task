import { News } from '../models/news.model.ts';

class NewsService {
  async getNews(archived: boolean, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const query = archived ? { archiveDate: { $ne: null } } : { archiveDate: null };

    const news = await News.find(query).skip(skip).limit(limit).sort({ date: -1 }).lean();
    const total = await News.countDocuments(query);

    return {
      news,
      pages: Math.ceil(total / limit)
    };
  }

  async archiveNews(id: string, date: Date | null) {
    const news = await News.findById(id);
    if (news) {
      news.archiveDate = date;
      await news.save();
    }
  }

  async saveNews(values: {
    title: string;
    description: string;
    author: string;
    content: string;
    image: string;
    date: Date;
  }) {
    const news = new News({ ...values });
    await news.save();
  }
}

const newsService = new NewsService();

export { newsService };
