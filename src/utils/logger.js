import winston from 'winston';
import moment from 'moment';

const { combine, timestamp, prettyPrint } = winston.format;

const getDate = () => moment().format('DD-MM-YYYY');

const getTransporters = () => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return [
        new winston.transports.File({
          filename: `logs/${getDate()}_error.log`,
          level: 'error',
        }),
        new winston.transports.File({
          filename: `logs/${getDate()}_info.log`,
          level: 'info',
        }),
      ];
    }
    case 'staging': {
      return [new winston.transports.Console()];
    }
    default: {
      return [new winston.transports.Console()];
    }
  }
};

const getLogger = () =>
  winston.createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: getTransporters(),
  });

const log = (level, message, functionName, object) =>
  getLogger().log({
    level,
    message: `${message}${functionName ? ` | at ${functionName}` : ''}.`,
    value: object,
  });

export default class Logger {
  static info(message, functionName = '', object = {}) {
    log('info', message, functionName, object);
  }

  static error(message, functionName = '', object = {}) {
    log('error', message, functionName, object);
  }
}
