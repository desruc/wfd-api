import catchErrors from '~/core/catchErrors';

import * as recipeService from '~/services/recipe';
import * as recipeRatingService from '~/services/recipeRating';

/**
 * Create a recipe
 */
export const createRecipe = catchErrors(async (req, res) => {
  const newRecipe = await recipeService.createRecipe(req.body);
  res.success({ message: 'Recipe created successfully', data: newRecipe });
});

/**
 * Get a recipe
 */
export const getRecipe = catchErrors(async (req, res) => {
  const { recipeId } = req.params;
  const result = await recipeService.getRecipeByQueryOrFail({ _id: recipeId });

  const rating = await recipeRatingService.getRatingForRecipe(recipeId);

  res.success({
    message: 'Recipe retrieved successfully',
    data: { ...result.toJSON(), rating }
  });
});

/**
 * Get a paginated list of public recipes
 */
export const getPublicList = catchErrors(async (req, res) => {
  const { page, skip, limit } = req.pagination;

  const query = { public: true };

  const { recipes, total } = await recipeService.getPaginatedRecipes(
    skip,
    limit,
    query
  );

  res.success({
    message: 'Receipes retrieved successfully',
    data: recipes,
    meta: { page, limit, total }
  });
});
