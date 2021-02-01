import { Application } from 'express';

import { checkStatus } from '~/controllers/v1/status';

import recipeRoutes from './v1/recipe';

export const attachRoutes = (app: Application): void => {
  const PREFIX = '/v1';

  app.get('/status', checkStatus);

  app.use(`${PREFIX}/recipes`, recipeRoutes());
};

export default attachRoutes;
