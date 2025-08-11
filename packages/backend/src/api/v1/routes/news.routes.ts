import { Router } from 'express';
import { getNews, archiveNews, saveNews, deleteNews } from '../controllers/news.controller.ts';
import { ROUTES } from '../constants.ts';

const router = Router();

const { ROOT, ID } = ROUTES;

router.get(ROOT, getNews);

router.patch(ROOT + ID, archiveNews);

router.post(ROOT, saveNews);

router.delete(ROOT + ID, deleteNews);

export default router;
