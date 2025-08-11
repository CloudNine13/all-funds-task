import { Document, model, Schema } from 'mongoose';

import { NEWS_MODEL_NAME } from '../constants.ts';

type NewsType = Document & {
  title: string;
  description: string;
  content: string;
  date: Date;
  author: string;
  archiveDate?: Date | null;
  image: string;
};

const newsSchema = new Schema<NewsType>(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    content: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    author: { type: String, required: true },
    archiveDate: { type: Date, default: null, index: true },
    image: { type: String }
  },
  { timestamps: true }
);

newsSchema.index({ archiveDate: 1, date: -1 });

const News = model<NewsType>(NEWS_MODEL_NAME, newsSchema);

export { News };
