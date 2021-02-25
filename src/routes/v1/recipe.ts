import express, { Router } from 'express';

import checkAuth from '~/middleware/auth';
import validate from '~/middleware/validate';

import * as recipeValidators from '~/validators/recipe';

import * as recipeController from '~/controllers/v1/recipe';
import * as recipeRatingController from '~/controllers/v1/recipeRating';

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
   * GET: Get a paginated list of auth users recipes
   */
  router.get('/me', checkAuth, recipeController.getAuthUserRecipes);

  /**
   * GET: Get paginated public recipes
   */
  router.get('/', recipeController.getPublicList);

  /**
   * GET: Get specified recipe
   */
  router.get('/:recipeId', recipeController.getRecipe);

  /**
   * POST: Post a rating to a recipe
   */
  router.post(
    '/:recipeId/rating',
    checkAuth,
    validate(recipeValidators.rating),
    recipeRatingController.createRecipeRating
  );

  /**
   * GET: Get the users rating for specified rating
   */
  router.get(
    '/:recipeId/rating',
    checkAuth,
    recipeRatingController.getUserRating
  );

  /**
   * GET: Get a paginated list of public recipes by the specified user
   */
  router.get('/user/:userId', recipeController.getUserRecipes);

  return router;
};
