const NEWS_API_PATH = '/api/v1/news';
const NEWS_MODEL_NAME = 'News';
const BUCKET_NAME = 'Uploads';

const QUERY_PARAMS = {
  ARCHIVED: 'archived',
  PAGE: 'page',
  LIMIT: 'limit'
};

const DEFAULTS = {
  PAGE: 1,
  LIMIT: 5
};

const IMAGE = {
  FIELD_NAME: 'image',
  MIN_STRING_LENGTH: 3,
  ID_LENGTH: 24,
  MIME_TYPES: {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    GIF: 'image/gif',
    SVG: 'image/svg+xml',
    WEBP: 'image/webp'
  },
  INVALID_TYPE_MESSAGE: 'Invalid image type',
  DEFAULT_OCTET_STREAM_MIME_TYPE: 'application/octet-stream',
  DATA_URL_PREFIX: 'data:',
  BASE64_ENCODING: 'base64' as const
};

const SEED = {
  NEWS_COUNT: 50,
  PUBLIC_SCRIPTS_DIR_NAME: 'public'
};

const ROUTES = {
  ROOT: '/',
  ID: ':id'
};

export { NEWS_API_PATH, NEWS_MODEL_NAME, BUCKET_NAME, QUERY_PARAMS, DEFAULTS, IMAGE, SEED, ROUTES };
