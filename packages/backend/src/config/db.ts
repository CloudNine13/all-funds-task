import mongoose from 'mongoose';

import { Logger } from '../lib/utils/loggers/index.ts';
import { config } from './config.ts';

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    Logger.info('OK: connected to MongoDB');

    mongoose.connection.on('error', (error) => {
      Logger.error('KO: MongoDB connection error - ', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      Logger.warn('KO: MongoDB disconnected');
    });
  } catch (error: unknown) {
    const err = error as Error;
    Logger.error('KO: DB connection failed - ', err.message);
    process.exit(1);
  }
};

export { connectDatabase };
