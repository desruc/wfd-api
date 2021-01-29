import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';

const {
  combine,
  simple,
  timestamp: timestampFunc,
  colorize,
  align,
  printf,
  splat
} = format;

const commonFile = {
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false
};

const options = {
  infoFile: {
    level: 'info',
    filename: `${String(appRoot)}/logs/app.log`,
    ...commonFile
  },
  errorFile: {
    level: 'error',
    filename: `${String(appRoot)}/logs/error.log`,
    ...commonFile
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      simple(),
      timestampFunc(),
      align(),
      colorize({ all: true }),
      splat(),
      printf(
        /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    )
  }
};

const logger = createLogger({
  transports: [
    new transports.File(options.infoFile),
    new transports.File(options.errorFile),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

export default logger;
