import mongoose from 'mongoose';

import { Logger } from '../lib/utils/loggers/index.ts';
import { MONGOOSE_EVENT_DISCONNECTED, MONGOOSE_EVENT_ERROR } from './constants.ts';
import { config } from './config.ts';

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    Logger.info('OK: connected to MongoDB');

    mongoose.connection.on(MONGOOSE_EVENT_ERROR, (error) => {
      Logger.error('KO: MongoDB connection error - ', error.message);
    });

    mongoose.connection.on(MONGOOSE_EVENT_DISCONNECTED, () => {
      Logger.warn('MongoDB disconnected');
    });
  } catch (error: unknown) {
    const err = error as Error;
    Logger.error('KO: DB connection failed - ', err.message);
    process.exit(1);
  }
};

export { connectDatabase };
