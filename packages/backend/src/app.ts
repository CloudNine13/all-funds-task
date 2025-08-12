import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { NEWS_API_PATH } from './api/v1/constants.ts';
import { errorHandler } from './api/v1/middlewares/errorHandler.middleware.ts';
import newsRouter from './api/v1/routes/news.routes.ts';
import { CSP_DIRECTIVES, PUBLIC_DIR_NAME } from './config/constants.ts';
import { morganRequestLogger } from './lib/utils/loggers/index.ts';

const { SELF, LOCALHOST, UNSAFE_INLINE, HTTPS_PROTOCOL, DATA_PROTOCOL } = CSP_DIRECTIVES;

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': [SELF, LOCALHOST, UNSAFE_INLINE],
        'img-src': [SELF, HTTPS_PROTOCOL, DATA_PROTOCOL],
        'default-src': [SELF]
      }
    }
  })
);
app.use(cors());
app.use(express.json());
app.use(morganRequestLogger);
app.use(express.static(PUBLIC_DIR_NAME));
app.use(NEWS_API_PATH, newsRouter);
app.use(errorHandler);

export default app;
