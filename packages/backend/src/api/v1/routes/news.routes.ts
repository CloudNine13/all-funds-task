import { Router } from 'express';
import { getNews } from '../controllers/news.controller.ts';
import { ROUTES } from '../constants.ts';

const router = Router();

router.get(ROUTES.ROOT, getNews);

export default router;
