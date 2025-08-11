import winston from 'winston';

import {
  LOG_FILE_COMBINED,
  LOG_FILE_ERROR,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  TIMESTAMP_FORMAT
} from './constants.ts';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
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
