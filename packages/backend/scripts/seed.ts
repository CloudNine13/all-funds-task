import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/index.ts';
import { News } from '../src/api/v1/models/news.model.ts';
import { exit } from 'process';
import Logger from '../src/lib/utils/loggers/logger.ts';
import { GridFSBucket, ObjectId } from 'mongodb';
import { connection } from '../src/config/db.ts';
import { BUCKET_NAME, SEED } from '../src/api/v1/constants.ts';
import * as fs from 'fs/promises';
import * as path from 'path';

const seedDB = async () => {
  await connectDatabase();

  try {
    const bucket = new GridFSBucket(connection.db!, { bucketName: BUCKET_NAME });
    await bucket.drop();
    Logger.info('OK: Old GridFS bucket dropped');

    await News.deleteMany({});
    Logger.info('OK: Old news deleted');

    const publicDir = path.join(__dirname, SEED.PUBLIC_SCRIPTS_DIR_NAME);
    const imageFiles = await fs.readdir(publicDir);
    const uploadedImageIds: ObjectId[] = [];

    for (const imageFile of imageFiles) {
      const imagePath = path.join(publicDir, imageFile);
      const imageBuffer = await fs.readFile(imagePath);
      const uploadStream = bucket.openUploadStream(imageFile, {
        contentType: `image/${imageFile.split('.').pop()}`
      });
      uploadStream.write(imageBuffer);
      uploadStream.end();

      await new Promise<void>((resolve, reject) => {
        uploadStream.on('finish', () => {
          uploadedImageIds.push(uploadStream.id);
          Logger.info(`Uploaded ${imageFile} with ID: ${uploadStream.id}`);
          resolve();
        });
        uploadStream.on('error', (error) => {
          Logger.error(`Error uploading ${imageFile}:`, error);
          reject(error);
        });
      });
    }
    Logger.info(`Uploaded ${uploadedImageIds.length} images to GridFS.`);

    const newsToCreate: Array<{
      title: string;
      description: string;
      content: string;
      date: Date;
      author: string;
      archiveDate: Date | null;
      image: ObjectId;
    }> = [];
    for (let i = 0; i < SEED.NEWS_COUNT; i++) {
      const isArchived = faker.datatype.boolean();
      newsToCreate.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        content: faker.lorem.paragraphs(5),
        author: faker.person.fullName(),
        date: faker.date.past(),
        archiveDate: isArchived ? faker.date.past() : null,
        image: uploadedImageIds[Math.floor(Math.random() * uploadedImageIds.length)]
      });
    }

    await News.insertMany(newsToCreate);
    Logger.info('OK: Database seeded successfully');
  } catch (error) {
    Logger.error('KO: error seeding database - ', error);
  } finally {
    await mongoose.disconnect();
    Logger.info('Disconnected from database');
    exit(1);
  }
};

seedDB();
