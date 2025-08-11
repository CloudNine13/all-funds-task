import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/index.ts';
import { News } from '../src/api/v1/models/news.model.ts';
import { exit } from 'process';
import Logger from '../src/lib/utils/loggers/logger.ts';

const seedDB = async () => {
  await connectDatabase();

  try {
    await News.deleteMany({});
    Logger.info('OK: Old news deleted');

    const newsToCreate: Array<{
      title: string;
      description: string;
      content: string;
      date: Date;
      author: string;
      archiveDate: Date | null;
      image: string;
    }> = [];
    for (let i = 0; i < 50; i++) {
      const isArchived = faker.datatype.boolean();
      newsToCreate.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        content: faker.lorem.paragraphs(5),
        date: faker.date.past(),
        author: faker.person.fullName(),
        archiveDate: isArchived ? faker.date.past() : null,
        image: faker.image.url({ width: 1000, height: 300 })
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
