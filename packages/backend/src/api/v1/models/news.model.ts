import { Document, model, Schema } from 'mongoose';
import { NEWS_MODEL_NAME, IS_ARCHIVED } from '../constants.ts';

type NewsType = Document & {
  title: string;
  description: string;
  date: Date;
  author: string;
  archiveDate?: Date | null;
};

const newsSchema = new Schema<NewsType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    author: { type: String, required: true },
    archiveDate: { type: Date, default: null, index: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

newsSchema.index({ archiveDate: 1, date: -1 });

newsSchema.virtual(IS_ARCHIVED).get((news: NewsType) => {
  return !!news.archiveDate;
});

const News = model<NewsType>(NEWS_MODEL_NAME, newsSchema);

export { News };
