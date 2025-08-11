import winston from 'winston';

import {
  LOG_FILE_COMBINED,
  LOG_FILE_ERROR,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_HTTP,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARN,
  TIMESTAMP_FORMAT
} from './constants.ts';

const levels = {
  [LOG_LEVEL_ERROR]: 0,
  [LOG_LEVEL_WARN]: 1,
  [LOG_LEVEL_INFO]: 2,
  [LOG_LEVEL_HTTP]: 3,
  [LOG_LEVEL_DEBUG]: 4
};

const colors = {
  [LOG_LEVEL_ERROR]: 'red',
  [LOG_LEVEL_WARN]: 'yellow',
  [LOG_LEVEL_INFO]: 'green',
  [LOG_LEVEL_HTTP]: 'magenta',
  [LOG_LEVEL_DEBUG]: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ all: true }))
  }),
  new winston.transports.File({
    filename: LOG_FILE_ERROR,
    level: LOG_LEVEL_ERROR
  }),
  new winston.transports.File({ filename: LOG_FILE_COMBINED })
];

const Logger = winston.createLogger({
  level: LOG_LEVEL_DEBUG,
  levels,
  format,
  transports
});

export default Logger;
