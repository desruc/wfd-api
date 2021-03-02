import * as dbHandler from '~/config/jest/dbHandler';

import CustomError from '~/core/customError';
import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

import User from '~/models/user';
import Recipe from '~/models/recipe';

import * as recipeService from '~/services/recipe';

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'auth0',
  firstName: 'Recipe Service User Firstname',
  lastName: 'Recipe Service User Lastname'
};

const testRecipe = {
  title: 'Recipe service recipe',
  description: 'Recipe service recipe description',
  author: mockObjectId,
  cookingTime: 10,
  public: true
};

describe('Recipe Service Tests', () => {
  beforeAll(async () => {
    await dbHandler.connect();
    const user = await new User(testUser).save();
    await new Recipe({ ...testRecipe, author: user.id }).save();
  });

  afterAll(async () => {
    await User.deleteMany({ firstName: testUser.firstName });
    await Recipe.deleteMany({ title: testRecipe.title });
    await dbHandler.closeDatabase();
  });

  it('Get a list paginated list of recipes', async () => {
    const { recipes, total } = await recipeService.getPaginatedRecipes(0, 10, {
      public: true
    });

    expect(total).toEqual(1);
    expect(recipes[0].title).toEqual(testRecipe.title);
  });

  it('Get a recipe by query', async () => {
    expect.assertions(2);

    const recipeDocument = await recipeService.getRecipeByQuery({
      title: testRecipe.title
    });

    if (recipeDocument) {
      expect(recipeDocument.title).toEqual(testRecipe.title);
      expect(recipeDocument.description).toEqual(testRecipe.description);
    }
  });

  it('It should get a recipe and not fail', async () => {
    const recipeDocument = await recipeService.getRecipeByQueryOrFail({
      title: testRecipe.title
    });

    expect(recipeDocument.title).toEqual(testRecipe.title);
    expect(recipeDocument.description).toEqual(testRecipe.description);
  });

  it('It should attempt to get a non existent recipe and fail', async () => {
    expect.assertions(1);

    await recipeService
      .getRecipeByQueryOrFail({ title: 'Nope' })
      .catch((error) => {
        expect(error).toEqual(
          new CustomError({
            ...CORE_ENTITY_NOT_FOUND,
            message: 'The requested recipe could not be found'
          })
        );
      });
  });

  it('Create a new recipe', async () => {
    const newRecipe = await recipeService.createRecipe({
      ...testRecipe,
      title: 'New recipe'
    });

    expect(newRecipe.title).toEqual('New recipe');

    await Recipe.deleteMany({ title: newRecipe.title });
  });

  it('Update a recipe', async () => {
    const updated = await recipeService.updateRecipe(
      { title: testRecipe.title },
      { description: 'Updated description' }
    );

    expect(updated.description).toEqual('Updated description');
  });

  it('Update a recipe that doesnt exist and fail', async () => {
    expect.assertions(1);

    await recipeService
      .updateRecipe({ title: 'Nope' }, { description: 'Updated description' })
      .catch((error) => {
        expect(error).toEqual(
          new CustomError({
            ...CORE_ENTITY_NOT_FOUND,
            message: 'The requested recipe could not be found'
          })
        );
      });
  });
});
