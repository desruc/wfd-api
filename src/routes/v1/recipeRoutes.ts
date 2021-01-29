import { Application } from 'express';

import validator from '../../core/validator';
import * as recipeValidators from '../../validators/recipe';

import * as recipeController from '../../controllers/recipeController';

import checkAuth from '../../middleware/auth';

export default (app: Application, prefix: string): void => {
  app.post(
    `${prefix}/`,
    checkAuth,
    validator(recipeValidators.create),
    recipeController.createRecipe
  );
  app.get(`${prefix}`, recipeController.getPublicList);
  app.get(`${prefix}/:uuid`, recipeController.getRecipe);
};
