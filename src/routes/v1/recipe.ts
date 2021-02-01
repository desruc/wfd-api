import express, { Router } from 'express';

import checkAuth from '~/middleware/auth';
import validate from '~/middleware/validate';

import * as recipeValidators from '~/validators/recipe';

import * as recipeController from '~/controllers/v1/recipe';

export default (): Router => {
  const router = express.Router();

  /**
   * POST: Create Recipe
   */
  router.post(
    '/',
    checkAuth,
    validate(recipeValidators.create),
    recipeController.createRecipe
  );

  /**
   * GET: Get paginated public recipes
   */
  router.get('/', recipeController.getPublicList);

  /**
   * GET: Get specified recipe
   */
  router.get('/:recipeId', recipeController.getRecipe);

  return router;
};
