import type { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../lib/utils/loggers/index.ts';
import { INTERNAL_SERVER_ERROR } from '../constants.ts';

const errorHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
  Logger.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || INTERNAL_SERVER_ERROR });
  next();
};

export { errorHandler };
