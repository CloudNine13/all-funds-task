import { Router } from 'express';

import { ROUTES } from '../constants.ts';
import { archiveNews, deleteNews, getNews, saveNews } from '../controllers/news.controller.ts';

const router = Router();

const { ROOT, ID } = ROUTES;

router.get(ROOT, getNews);

router.patch(ROOT + ID, archiveNews);

router.post(ROOT, saveNews);

router.delete(ROOT + ID, deleteNews);

export default router;
