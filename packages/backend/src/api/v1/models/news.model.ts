import { Document, model, Schema } from 'mongoose';

import { NEWS_MODEL_NAME } from '../constants.ts';
import { getGfsBucket } from '../../../config/db.ts';
import Logger from '../../../lib/utils/loggers/logger.ts';
import type { NewsModelType } from '../../../lib/types/NewsType.ts';

type NewsDocumentType = Document & NewsModelType;

const newsSchema = new Schema<NewsDocumentType>(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    content: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    author: { type: String, required: true },
    archiveDate: { type: Date, default: null, index: true },
    image: { type: Schema.Types.ObjectId, default: null }
  },
  { timestamps: true }
);

newsSchema.index({ archiveDate: 1, date: -1 });

const handlePostDelete = async (doc: NewsDocumentType) => {
  if (doc?.image) {
    try {
      await getGfsBucket().delete(doc.image);
      Logger.info(`Deleted file from GridFS: ${doc.image}`);
    } catch (err) {
      Logger.error(`Failed to delete file: ${err}`);
    }
  }
};

newsSchema.post('findOneAndDelete', handlePostDelete);

const News = model<NewsDocumentType>(NEWS_MODEL_NAME, newsSchema);

export { News };
