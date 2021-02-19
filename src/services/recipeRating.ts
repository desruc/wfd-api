import RecipeRating, { RecipeRatingDocument } from '~/models/recipeRating';

import CustomError from '~/core/customError';
import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

/**
 * Computes the current rating for a recipe
 * @param recipeId a valid recipe id
 */
export const getRatingForRecipe = async (recipeId: string): Promise<number> => {
  const allRatings = await RecipeRating.find({ recipe: recipeId });
  const count = await RecipeRating.find({ recipe: recipeId }).count();

  const computedRating =
    allRatings.reduce((p, { score }) => p + score, 0) / count;

  return Number(computedRating.toFixed(2));
};

/**
 * Returns all the ratings stored against a user
 * @param userId a valid user id
 */
export const getUserRatings = async (
  userId: string
): Promise<RecipeRatingDocument[]> => {
  const allRatings = await RecipeRating.find({ user: userId });
  return allRatings;
};

/**
 * Creates and returns a recipe rating database record
 * @param recipeId a valid recipe id
 * @param userId the id of the user posting the rating
 * @param score the score the user gives the recipe
 */
export const createRecipeRating = async (
  recipeId: string,
  userId: string,
  score: number
): Promise<RecipeRatingDocument> => {
  const result = await new RecipeRating({
    recipe: recipeId,
    user: userId,
    score
  }).save();

  return result;
};

/**
 * Updates and returns an existing recipe rating. Throws an error if the rating
 * does not exist.
 * @param recipeId a valid recipe id
 * @param userId the auth user id
 * @param score the updated score
 */
export const updateRecipeRating = async (
  recipeId: string,
  userId: string,
  score: number
): Promise<RecipeRatingDocument> => {
  const updated = await RecipeRating.findOneAndUpdate(
    { recipe: recipeId, user: userId },
    { score },
    { new: true }
  );

  if (!updated) {
    throw new CustomError({
      ...CORE_ENTITY_NOT_FOUND,
      message: 'The requested recipe rating could not be found'
    });
  }

  return updated;
};
