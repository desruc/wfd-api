import catchErrors from '~/core/catchErrors';

import * as recipeService from '~/services/recipe';

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
  const { uuid } = req.params;
  const result = await recipeService.getRecipeByQueryOrFail({ uuid });
  res.success({ message: 'Recipe retrieved successfully', data: result });
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
