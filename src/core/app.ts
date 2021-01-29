import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import responseHandler from './responseHandler';
import errorHandler from './errorHandler';
import pagination from './pagination';

import logger from './logger';

import routes from '../routes';

const initializeServer = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message) }
    })
  );

  app.use(pagination);

  app.use(responseHandler);

  routes(app);

  app.use(errorHandler);

  return app;
};

export default initializeServer;
