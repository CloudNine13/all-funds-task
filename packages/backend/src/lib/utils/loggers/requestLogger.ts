import morgan, { type StreamOptions } from 'morgan';

import { MORGAN_FORMAT } from './constants.ts';
import Logger from './logger.ts';

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

const morganRequestLogger = morgan(MORGAN_FORMAT, {
  stream
});

export default morganRequestLogger;
