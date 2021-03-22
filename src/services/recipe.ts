import Recipe, { RecipeDocument } from '~/models/recipe';

import CustomError from '~/core/customError';
import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

interface CreateRecipeReq {
  title: string;
  description: string;
  image?: string;
  author: string;
  public: boolean;
  tags?: string[];
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookingTime: number;
}

/**
 * Creates and returns a recipe database record
 * @param data A validated recipe object
 */
export const createRecipe = async (
  data: CreateRecipeReq
): Promise<RecipeDocument> => {
  const newRecipe = await new Recipe({
    ...data,
    tags: data.tags ? data.tags.map((t) => t.toLowerCase()) : []
  }).save();

  return newRecipe;
};

/**
 * Returns the updated community record. Fails if the community can not be found.
 * @param query A valid MongoDB query
 * @param data The updates to be applied to the community
 */
export const updateRecipe = async (
  query: {
    [key: string]: string | number;
  },
  data: { [key: string]: any }
): Promise<RecipeDocument> => {
  const updated = await Recipe.findOneAndUpdate(query, data, { new: true });

  if (!updated) {
    throw new CustomError({
      ...CORE_ENTITY_NOT_FOUND,
      message: 'The requested recipe could not be found'
    });
  }

  return updated;
};

/**
 * Returns a paginated array of recipe records and the total number of records that match the query
 * @param skip The amount of records to skip. Defaults to 0.
 * @param limit The limit of records to return. Defaults to 20.
 * @param query A valid MongoDB query
 */
export const getPaginatedRecipes = async (
  skip = 0,
  limit = 20,
  query: Record<string, unknown> = {}
): Promise<{ recipes: RecipeDocument[]; total: number }> => {
  const recipeCount = await Recipe.countDocuments(query);
  const paginatedRecipes = await Recipe.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return { recipes: paginatedRecipes, total: recipeCount };
};

/**
 * Returns a recipe database record if found. Otherwise returns null.
 * @param query A valid MongoDB query
 */
export const getRecipeByQuery = async (query: {
  [key: string]: string | number;
}): Promise<RecipeDocument | null> => {
  const recipeResult = await Recipe.findOne(query);
  return recipeResult;
};

/**
 * Either returns a recipe database record or fails.
 * @param query A valid MongoDB query
 */
export const getRecipeByQueryOrFail = async (query: {
  [key: string]: string | number;
}): Promise<RecipeDocument> => {
  const recipeResult = await Recipe.findOne(query);

  if (!recipeResult) {
    throw new CustomError({
      ...CORE_ENTITY_NOT_FOUND,
      message: 'The requested recipe could not be found'
    });
  }

  return recipeResult;
};
