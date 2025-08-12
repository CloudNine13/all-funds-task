import mongoose from 'mongoose';

import { Logger } from '../lib/utils/loggers/index.ts';
import { MONGOOSE_EVENTS } from './constants.ts';
import { config } from './config.ts';
import { GridFSBucket } from 'mongodb';
import { BUCKET_NAME } from '../api/v1/constants.ts';

let gfsBucket: GridFSBucket | null = null;

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri).then((db) => {
      const database = db.connection.db;
      gfsBucket = new GridFSBucket(database, {
        bucketName: BUCKET_NAME
      });
      Logger.info('OK: connected to MongoDB and GridFS bucket created');
    });

    mongoose.connection.on(MONGOOSE_EVENTS.ERROR, (error) => {
      Logger.error('KO: MongoDB connection error - ', error.message);
    });

    mongoose.connection.on(MONGOOSE_EVENTS.DISCONNECTED, () => {
      Logger.warn('MongoDB disconnected');
    });
  } catch (error: unknown) {
    const err = error as Error;
    Logger.error('KO: DB and GridFS connections failed - ', err.message);
    process.exit(1);
  }
};

const getGfsBucket = (): GridFSBucket => {
  if (!gfsBucket) {
    throw new Error('GridFSBucket not initialized. Call connectDatabase first.');
  }
  return gfsBucket;
};

const connection: mongoose.Connection = mongoose.connection;

export { connectDatabase, getGfsBucket, connection };
