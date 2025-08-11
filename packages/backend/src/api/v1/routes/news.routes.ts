import { Router } from 'express';
import { getNews, archiveNews } from '../controllers/news.controller.ts';
import { ROUTES } from '../constants.ts';

const router = Router();

router.get(ROUTES.ROOT, getNews);

router.patch(ROUTES.ID, archiveNews);

export default router;
