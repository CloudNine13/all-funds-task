import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../../../lib/utils/loggers/index.ts';
import { newsService } from '../services/news.service.ts';

import { DEFAULTS, QUERY_PARAMS } from '../constants.ts';
import { uploadImageToGridFS, processNewsImages } from '../../../lib/utils/imageUtils.ts';

const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Received request to get news');
    const archived = req.query[QUERY_PARAMS.ARCHIVED] === 'true';
    const page = parseInt(req.query[QUERY_PARAMS.PAGE] as string) || DEFAULTS.PAGE;
    const limit = parseInt(req.query[QUERY_PARAMS.LIMIT] as string) || DEFAULTS.LIMIT;

    Logger.http(`Archived: ${archived}, Page: ${page}, Limit: ${limit}`);
    const result = await newsService.getNews(archived, page, limit);
    const news = result.news;
    const pages = result.pages;

    Logger.debug('Processing images for news items', news);
    const newsWithImages = await processNewsImages(news);
    Logger.debug('Images processed. Sending response.', newsWithImages);

    res.json({ news: newsWithImages, pages: pages });
  } catch (error: unknown) {
    next(error);
  }
};

const archiveNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Received request to archive news');
    const { date } = req.body;
    const { id } = req.params;
    Logger.http(`ID: ${id}, Date: ${date}`);
    await newsService.archiveNews(id, date);
    Logger.debug(`News with ID: ${id} archived/unarchived successfully.`);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

const saveNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Received request to save news');
    const { title, description, content, author, date } = req.body;
    let image: string | undefined;

    if (req.file) {
      Logger.debug(`File received for upload: ${req.file.originalname}`);
      image = (await uploadImageToGridFS(req.file)) || undefined;
    }

    const values = {
      title,
      description,
      content,
      author,
      date,
      image
    };

    Logger.http(`Saving news with title: ${values.title}`);
    await newsService.saveNews(values);
    Logger.debug(`News with title: ${values.title} saved successfully.`);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Received request to delete news');
    const { id } = req.params;
    Logger.http(`ID: ${id}`);
    await newsService.deleteNews(id);
    Logger.debug(`News with ID: ${id} deleted successfully.`);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

export { getNews, archiveNews, saveNews, deleteNews };
