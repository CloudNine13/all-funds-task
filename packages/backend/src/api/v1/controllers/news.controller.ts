import type { NextFunction, Request, Response } from 'express';

import { Logger } from '../../../lib/utils/loggers/index.ts';
import { newsService } from '../services/news.service.ts';

const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Getting news');
    const archived = req.query.archived === 'true';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    Logger.http(`Archived: ${archived}, Page: ${page}, Limit: ${limit}`);
    const news = await newsService.getNews(archived, page, limit);
    res.json(news);
  } catch (error: unknown) {
    next(error);
  }
};

const archiveNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Archiving news');
    const { date } = req.body;
    const { id } = req.params;
    Logger.http(`ID: ${id}, Date: ${date}`);
    await newsService.archiveNews(id, date);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

const saveNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Saving news');
    const values = req.body;
    await newsService.saveNews(values);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Deleting news');
    const { id } = req.params;
    Logger.http(`ID: ${id}`);
    await newsService.deleteNews(id);
    res.sendStatus(204);
  } catch (error: unknown) {
    next(error);
  }
};

export { getNews, archiveNews, saveNews, deleteNews };
