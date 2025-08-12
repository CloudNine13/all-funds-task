import { Types } from 'mongoose';

export interface NewsBaseType {
  title: string;
  description: string;
  author: string;
  content: string;
  date: Date;
  archiveDate?: Date | null;
}

export type NewsModelType = NewsBaseType & {
  image?: Types.ObjectId;
};
