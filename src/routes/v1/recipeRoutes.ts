import express, { Router } from 'express';

import checkAuth from '~/middleware/auth';
import validate from '~/middleware/validate';

import * as recipeValidators from '~/validators/recipe';

import * as recipeController from '~/controllers/v1/recipeController';

export default (): Router => {
  const router = express.Router();

  router.post(
    '/',
    checkAuth,
    validate(recipeValidators.create),
    recipeController.createRecipe
  );

  router.get('/', recipeController.getPublicList);

  router.get('/:uuid', recipeController.getRecipe);

  return router;
};
