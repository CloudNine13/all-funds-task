import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { NEWS_API_PATH } from './api/v1/constants.ts';
import { errorHandler } from './api/v1/middlewares/errorHandler.ts';
import newsRouter from './api/v1/routes/news.routes.ts';
import { LOCALHOST, SELF } from './config/constants.ts';
import { morganRequestLogger } from './lib/utils/loggers/index.ts';

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': [SELF, LOCALHOST, "'unsafe-inline'"],
        'img-src': [SELF, 'https:'],
        'default-src': [SELF]
      }
    }
  })
);
app.use(cors());
app.use(express.json());
app.use(morganRequestLogger);
app.use(express.static('public'));
app.use(NEWS_API_PATH, newsRouter);
app.use(errorHandler);

export default app;
