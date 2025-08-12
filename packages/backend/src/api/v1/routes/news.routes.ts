import { Router } from 'express';

import { IMAGE, ROUTES } from '../constants.ts';
import { archiveNews, deleteNews, getNews, saveNews } from '../controllers/news.controller.ts';
import { validate } from '../middlewares/validate.middleware.ts';
import {
  archiveNewsSchema,
  deleteNewsSchema,
  getNewsSchema,
  saveNewsSchema
} from '../schemas/news.schema.ts';
import upload from '../middlewares/upload.middleware.ts';

const router = Router();

const { ROOT, ID } = ROUTES;

router.get(ROOT, validate(getNewsSchema), getNews);

router.patch(ROOT + ID, validate(archiveNewsSchema), archiveNews);

router.post(ROOT, upload.single(IMAGE.FIELD_NAME), validate(saveNewsSchema), saveNews);

router.delete(ROOT + ID, validate(deleteNewsSchema), deleteNews);

export default router;
