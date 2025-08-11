import mongoose from 'mongoose';
import { Logger } from '../lib/utils/loggers/index.ts';
import { config } from './config.ts';

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    Logger.info('OK: connected to MongoDB');
  } catch (error: unknown) {
    const err = error as Error;
    Logger.error('KO: DB connection failed - ', err.message);
    process.exit(1);
  }
};

export { connectDatabase };
