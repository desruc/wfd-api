import catchErrors from '~/core/catchErrors';

import * as recipeService from '~/services/recipe';
import * as recipeRatingService from '~/services/recipeRating';

/**
 * Create a rating against a recipe
 */
export const createRecipeRating = catchErrors(async (req, res) => {
  const { recipeId } = req.params;

  await recipeService.getRecipeByQueryOrFail({ _id: recipeId });

  const { id } = req.user;
  const { score } = req.body as { score: number };

  const rating = await recipeRatingService.createOrUpdateRecipeRating(
    recipeId,
    id,
    score
  );

  res.success({
    message: 'Recipe rated succesfully',
    data: rating
  });
});

/**
 * Get the requesting users rating for the specified recipe
 */
export const getUserRating = catchErrors(async (req, res) => {
  const { recipeId } = req.params;
  const { id: userId } = req.user;

  const rating = await recipeRatingService.getUserRatingForRecipe(
    recipeId,
    userId
  );

  res.success({
    message: 'Recipe rating retrieved successfully',
    data: rating
  });
});
