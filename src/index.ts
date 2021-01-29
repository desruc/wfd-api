import 'dotenv/config';
import logger from './core/logger';

import initializeDb from './config/db';
import initializeServer from './core/app';

process.on('unhandledRejection', (e) => {
  logger.error('UNHANDLED_REJECTION: ', e);
});

process.on('uncaughtException', (e) => {
  logger.error('UNCAUGHT_EXCEPTION: ', e);
  logger.warning('NODE_WARN: ', {
    stack: 'Uncaught Exception detected. Restarting...'
  });
  process.exit(1);
});

/**
 * Connects to the database then starts the express server
 */
const initializeApp = async (): Promise<void> => {
  await initializeDb();
  const server = initializeServer();
  server.listen(process.env.PORT || 3000);
};

/* eslint-disable-next-line @typescript-eslint/no-floating-promises */
initializeApp();
