import { RequestHandler } from 'express';

import asyncCatch from '~/core/catchErrors';

import CustomError from '~/core/customError';
import { CORE_FORBIDDEN } from '~/errors/core';

import { getRecipeByQuery } from '~/services/recipe';

export const canModifyRecipe: RequestHandler = asyncCatch(
  async (req, _res, next) => {
    const { id: author } = req.user;

    const { recipeId } = req.params;

    const recipe = await getRecipeByQuery({
      _id: recipeId,
      author
    });

    if (recipe) next();
    else next(new CustomError(CORE_FORBIDDEN));
  }
);
