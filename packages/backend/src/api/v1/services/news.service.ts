import { Logger } from '../../../lib/utils/loggers/index.ts';
import { News } from '../models/news.model.ts';

class NewsService {
  async getNews(archived: boolean, page: number, limit: number) {
    Logger.info('Fetching news from database');
    const skip = (page - 1) * limit;
    const query = archived ? { archiveDate: { $ne: null } } : { archiveDate: null };

    const news = await News.find(query).skip(skip).limit(limit).sort({ date: -1 }).lean();
    const total = await News.countDocuments(query);
    Logger.debug(`Found ${news.length} news and ${total} total`);

    return {
      news,
      pages: Math.ceil(total / limit)
    };
  }

  async archiveNews(id: string, date: Date | null) {
    Logger.info(`Archiving news with id: ${id}`);
    const news = await News.findById(id);
    if (news) {
      news.archiveDate = date;
      await news.save();
      Logger.debug(`Archived news with id: ${id}`);
    } else {
      Logger.warn(`News with id: ${id} not found`);
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
    Logger.info('Saving news to database');
    const news = new News({ ...values });
    await news.save();
    Logger.debug(`Saved news with title: ${values.title}`);
  }

  async deleteNews(id: string) {
    Logger.info(`Deleting news with id: ${id}`);
    await News.findByIdAndDelete(id);
    Logger.debug(`Deleted news with id: ${id}`);
  }
}

const newsService = new NewsService();

export { newsService };
