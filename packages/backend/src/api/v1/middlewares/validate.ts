import { type NextFunction, type Request, type Response } from 'express';
import { type ZodObject } from 'zod';

const validate = (schema: ZodObject) => (req: Request, _: Response, next: NextFunction) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    if (parsed.body) {
      req.body = parsed.body;
    }
    next();
  } catch (error: unknown) {
    const err = error as Error & { status: number };
    err.status = 400;
    next(err);
  }
};

export default validate;
