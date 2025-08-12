import { type NextFunction, type Request, type Response } from 'express';
import { Logger } from '../../../lib/utils/loggers/index.ts';
import { type ZodObject } from 'zod';

const validate = (schema: ZodObject) => (req: Request, _: Response, next: NextFunction) => {
  try {
    const dataToValidate: Record<string, any> = {
      body: req.body,
      query: req.query,
      params: req.params
    };

    if (req.file) {
      dataToValidate.file = req.file;
    }

    const parsed = schema.parse(dataToValidate);

    if (parsed.body) {
      req.body = parsed.body;
    }

    if (parsed.file) {
      req.file = parsed.file as Express.Multer.File;
    }

    next();
  } catch (error: unknown) {
    const err = error as Error & { status: number };
    err.status = 400;
    Logger.error('KO: Validation error: ', error);
    next(err);
  }
};

export { validate };
