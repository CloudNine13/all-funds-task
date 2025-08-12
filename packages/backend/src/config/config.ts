import path from 'path';

import dotenv from 'dotenv';
import { DOTENV_CONFIG_PATH } from './constants.ts';

dotenv.config({ path: path.resolve(process.cwd(), DOTENV_CONFIG_PATH) });

const config = {
  port: parseInt(process.env.PORT),
  mongoUri: process.env.MONGO_URI || '',
  uploadDir: process.env.UPLOAD_DIR || '',
  baseUrl: process.env.BASE_URL || ''
};

export { config };
