import { Application } from 'express';

import { checkStatus } from '~/controllers/v1/status';

import recipeRoutes from './v1/recipe';
import userRoutes from './v1/user';

export const attachRoutes = (app: Application): void => {
  const PREFIX = '/v1';

  app.get('/status', checkStatus);

  app.use(`${PREFIX}/recipes`, recipeRoutes());
  app.use(`${PREFIX}/users`, userRoutes());
};

export default attachRoutes;
