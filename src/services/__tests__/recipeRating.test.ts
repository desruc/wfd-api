import * as dbHandler from '~/config/jest/dbHandler';

// import CustomError from '~/core/customError';
// import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

import User from '~/models/user';
import Recipe from '~/models/recipe';
import RecipeRating from '~/models/recipeRating';

import * as recipeRatingService from '~/services/recipeRating';

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'auth0',
  firstName: 'Recipe Rating Service User Firstname',
  lastName: 'Recipe Rating Service User Lastname'
};

const testRecipe = {
  title: 'Recipe rating test recipe',
  description: 'Recipe rating test recipe description',
  author: mockObjectId,
  cookingTime: 10,
  public: true
};

describe('Recipe Service Tests', () => {
  beforeAll(async () => {
    await dbHandler.connect();
    const user = await new User(testUser).save();
    const recipe = await new Recipe({ ...testRecipe, author: user.id }).save();
    await new RecipeRating({
      user: user.id,
      recipe: recipe.id,
      score: 5
    }).save();
  });

  afterAll(async () => {
    await User.deleteMany({ firstName: testUser.firstName });
    await Recipe.deleteMany({ title: testRecipe.title });

    const user = await User.findOne({ firstName: testUser.firstName });
    await RecipeRating.deleteMany({ user: user?.id });
    await dbHandler.closeDatabase();
  });

  it('Calculate rating for a recipe', async () => {
    const recipe = await Recipe.findOne({ title: testRecipe.title });

    const rating = await recipeRatingService.getRatingForRecipe(
      recipe?.id as string
    );

    expect(rating).toEqual(5);
  });

  it('Get user recipe rating for specific recipe', async () => {
    expect.assertions(1);

    const user = await User.findOne({ firstName: testUser.firstName });
    const recipe = await Recipe.findOne({ title: testRecipe.title });

    const rating = await recipeRatingService.getUserRatingForRecipe(
      recipe?.id as string,
      user?.id as string
    );

    if (rating) {
      expect(rating.score).toEqual(5);
    }
  });

  it('Get all user ratings', async () => {
    const user = await User.findOne({ firstName: testUser.firstName });

    const ratings = await recipeRatingService.getUserRatings(
      user?.id as string
    );

    expect(ratings.length).toEqual(1);
  });

  it('Create a recipe rating', async () => {
    const user = await User.findOne({ firstName: testUser.firstName });

    const result = await recipeRatingService.createOrUpdateRecipeRating(
      mockObjectId,
      user?.id as string,
      5
    );

    expect(result.score).toEqual(5);
  });

  it('Update a recipe rating', async () => {
    const user = await User.findOne({ firstName: testUser.firstName });

    const updated = await recipeRatingService.createOrUpdateRecipeRating(
      mockObjectId,
      user?.id as string,
      10
    );

    expect(updated.score).toEqual(10);
  });
});
