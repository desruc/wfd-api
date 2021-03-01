import express, { Router } from 'express';

import { ensureAuthenticated, checkAuthenticated } from '~/middleware/auth';
import validate from '~/middleware/validate';
import { canModifyRecipe } from '~/middleware/recipes';

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
    ensureAuthenticated,
    validate(recipeValidators.create),
    recipeController.createRecipe
  );

  /**
   * GET: Get a paginated list of auth users recipes
   */
  router.get('/me', ensureAuthenticated, recipeController.getAuthUserRecipes);

  /**
   * GET: Get paginated public recipes
   */
  router.get('/', recipeController.getPublicList);

  /**
   * GET: Get specified recipe
   */
  router.get('/:recipeId', checkAuthenticated, recipeController.getRecipe);

  /**
   * POST: Post a rating to a recipe
   */
  router.post(
    '/:recipeId/rating',
    ensureAuthenticated,
    validate(recipeValidators.rating),
    recipeRatingController.createRecipeRating
  );

  /**
   * GET: Get the users rating for specified rating
   */
  router.get(
    '/:recipeId/rating',
    ensureAuthenticated,
    recipeRatingController.getUserRating
  );

  /**
   * GET: Get a paginated list of public recipes by the specified user
   */
  router.get('/user/:userId', recipeController.getUserRecipes);

  /**
   * PUT: Update a recipe.
   */
  router.put(
    '/:recipeId',
    ensureAuthenticated,
    canModifyRecipe,
    validate(recipeValidators.update),
    recipeController.updateRecipe
  );

  return router;
};
