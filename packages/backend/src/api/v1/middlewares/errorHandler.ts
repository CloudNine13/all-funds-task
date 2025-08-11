import type { NextFunction, Request, Response } from 'express';

import { INTERNAL_SERVER_ERROR } from '../constants.ts';
import { Logger } from '../../../lib/utils/loggers/index.ts';

const errorHandler = (error: any, _: Request, res: Response, next: NextFunction) => {
  Logger.error(error.message);
  Logger.error(error.stack);
  res.status(error.status || 500).json({ message: error.message || INTERNAL_SERVER_ERROR });
  next();
};

export { errorHandler };
