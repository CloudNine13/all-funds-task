import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import newsRouter from './api/v1/routes/news.routes.ts';
import { errorHandler } from './api/v1/middlewares/errorHandler.ts';
import { morganRequestLogger } from './lib/utils/loggers/index.ts';
import { SELF, LOCALHOST } from './config/constants.ts';
import { NEWS_API_PATH } from './api/v1/constants.ts';

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: { 'script-src': [SELF, LOCALHOST] }
    }
  })
);
app.use(cors());
app.use(express.json());
app.use(morganRequestLogger);
app.use(errorHandler);
app.use(NEWS_API_PATH, newsRouter);

export default app;
