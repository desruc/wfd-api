import User, { UserDocument } from '~/models/user';

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
