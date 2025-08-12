import { GridFSBucket } from 'mongodb';
import { connection } from '../../config/db.ts';
import { BUCKET_NAME, IMAGE } from '../../api/v1/constants.ts';
import { Logger } from './loggers/index.ts';
import { Types } from 'mongoose';
import type { NewsModelType } from '../types/NewsType.ts';

const downloadImageFromGridFS = async (imageId: Types.ObjectId): Promise<string | null> => {
  try {
    const bucket = new GridFSBucket(connection.db, { bucketName: BUCKET_NAME });
    const downloadStream = bucket.openDownloadStream(imageId);
    let imageBuffer = Buffer.from('');
    let contentType = '';

    await new Promise<void>((resolve, reject) => {
      downloadStream.on('file', (file) => {
        contentType = file.contentType || IMAGE.DEFAULT_OCTET_STREAM_MIME_TYPE;
      });
      downloadStream.on('data', (chunk) => {
        imageBuffer = Buffer.concat([imageBuffer, chunk]);
      });
      downloadStream.on('error', (error) => {
        Logger.error(`Error downloading image ${imageId} from GridFS:`, error);
        reject(error);
      });
      downloadStream.on('end', () => {
        resolve();
      });
    });

    if (imageBuffer.length > 0) {
      return `${IMAGE.DATA_URL_PREFIX}${contentType};${IMAGE.BASE64_ENCODING},${imageBuffer.toString(IMAGE.BASE64_ENCODING)}`;
    }
    return null;
  } catch (error) {
    Logger.error(`Failed to process image ${imageId} from GridFS:`, error);
    return null;
  }
};

const processNewsImages = async (news: NewsModelType[]) => {
  return await Promise.all(
    news.map(async (item) => {
      if (item.image) {
        const imageBase64 = await downloadImageFromGridFS(item.image);
        if (imageBase64) {
          return {
            ...item,
            image: imageBase64
          };
        }
      }
      return item;
    })
  );
};

const uploadImageToGridFS = async (file: Express.Multer.File): Promise<string | null> => {
  try {
    const bucket = new GridFSBucket(connection.db, { bucketName: BUCKET_NAME });
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype
    });

    uploadStream.write(file.buffer);
    uploadStream.end();

    return new Promise<string | null>((resolve, reject) => {
      uploadStream.on('finish', () => {
        const imageId = uploadStream.id.toString();
        Logger.info(`File uploaded to GridFS with ID: ${imageId}`);
        resolve(imageId);
      });
      uploadStream.on('error', (error) => {
        Logger.error('Error uploading file to GridFS:', error);
        reject(error);
      });
    });
  } catch (error) {
    Logger.error('Failed to upload image to GridFS:', error);
    return null;
  }
};

export { uploadImageToGridFS, processNewsImages };
