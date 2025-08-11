import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const config = {
  port: parseInt(process.env.PORT || '3000'),
  mongoUri: process.env.MONGO_URI || '',
  uploadDir: process.env.UPLOAD_DIR || '',
  baseUrl: process.env.BASE_URL || ''
};

export { config };
