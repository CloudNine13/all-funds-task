import type { NextFunction, Request, Response } from 'express';
import { newsService } from '../services/news.service.ts';

const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const archived = req.query.archived === 'true';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const news = await newsService.getNews(archived, page, limit);
    res.json(news);
  } catch (error: any) {
    next(error);
  }
};

export { getNews };
