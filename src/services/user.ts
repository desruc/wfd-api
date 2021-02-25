import User, { UserDocument } from '~/models/user';

import CustomError from '~/core/customError';
import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

/**
 * Creates a user record in mongo if none exists
 * @param auth0Id a valid auth0 identifier
 */
export const ensureLocalRecordExists = async (
  auth0Id: string
): Promise<UserDocument> => {
  const exists = await User.findOne({ auth0Id });

  if (!exists) {
    const newUser = await new User({ auth0Id }).save();
    return newUser;
  }

  return exists;
};

/**
 * Returns the updated user record. Fails if the user can not be found.
 * @param query A valid MongoDB query
 * @param data The updates to be applied to the user
 */
export const updateUser = async (
  query: {
    [key: string]: string | number;
  },
  data: { [key: string]: any }
): Promise<UserDocument> => {
  const updated = await User.findOneAndUpdate(query, data, { new: true });

  if (!updated) {
    throw new CustomError({
      ...CORE_ENTITY_NOT_FOUND,
      message: 'The requested user could not be found'
    });
  }

  return updated;
};

/**
 * Either returns a user database record or fails.
 * @param query A valid MongoDB query
 */
export const getUserByQueryOrFail = async (query: {
  [key: string]: string | number;
}): Promise<UserDocument> => {
  const userResult = await User.findOne(query);

  if (!userResult) {
    throw new CustomError({
      ...CORE_ENTITY_NOT_FOUND,
      message: 'The requested user could not be found'
    });
  }

  return userResult;
};
