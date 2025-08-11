import { Router } from 'express';

import { ROUTES } from '../constants.ts';
import { archiveNews, deleteNews, getNews, saveNews } from '../controllers/news.controller.ts';
import validate from '../middlewares/validate.ts';
import {
  archiveNewsSchema,
  deleteNewsSchema,
  getNewsSchema,
  saveNewsSchema
} from '../schemas/news.schema.ts';

const router = Router();

const { ROOT, ID } = ROUTES;

router.get(ROOT, validate(getNewsSchema), getNews);

router.patch(ROOT + ID, validate(archiveNewsSchema), archiveNews);

router.post(ROOT, validate(saveNewsSchema), saveNews);

router.delete(ROOT + ID, validate(deleteNewsSchema), deleteNews);

export default router;
