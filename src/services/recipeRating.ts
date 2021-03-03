import RecipeRating, { RecipeRatingDocument } from '~/models/recipeRating';

/**
 * Computes the current rating for a recipe
 * @param recipeId a valid recipe id
 */
export const getRatingForRecipe = async (recipeId: string): Promise<number> => {
  const allRatings = await RecipeRating.find({ recipe: recipeId });
  const count = await RecipeRating.find({ recipe: recipeId }).countDocuments();

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
 * Returns the users rating for the specified recipe if it exists or returns null
 * @param recipeId a valid recipe id
 * @param userId the auth user id
 */
export const getUserRatingForRecipe = async (
  recipeId: string,
  userId: string
): Promise<RecipeRatingDocument | null> => {
  const rating = await RecipeRating.findOne({ user: userId, recipe: recipeId });
  return rating;
};

/**
 * Creates/updates and returns a recipe rating database record
 * @param recipeId a valid recipe id
 * @param userId the id of the user posting the rating
 * @param score the score the user gives the recipe
 */
export const createOrUpdateRecipeRating = async (
  recipeId: string,
  userId: string,
  score: number
): Promise<RecipeRatingDocument> => {
  const result = await RecipeRating.findOneAndUpdate(
    { recipe: recipeId, user: userId },
    { recipe: recipeId, user: userId, score },
    { upsert: true, new: true }
  );

  return result;
};
