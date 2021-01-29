import { Application, RequestHandler } from 'express';

import recipeRoutes from './v1/recipeRoutes';

const healthCheck: RequestHandler = (_req, res) =>
  res.status(200).json('Alive and kicking');

export const attachRoutes = (app: Application): void => {
  app.get('/health', healthCheck);
  recipeRoutes(app, '/v1/recipe');
};

export default attachRoutes;
