import * as dbHandler from '~/config/jest/dbHandler';

import CustomError from '~/core/customError';
import { CORE_ENTITY_NOT_FOUND } from '~/errors/core';

import User from '~/models/user';

import * as userService from '~/services/user';

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'userService',
  firstName: 'User service Firstname',
  lastName: 'User service Lastname'
};

describe('User Service Tests', () => {
  beforeAll(async () => {
    await dbHandler.connect();
    await new User(testUser).save();
  });

  afterAll(async () => {
    await User.deleteMany({ firstName: testUser.auth0Id });
    await dbHandler.closeDatabase();
  });

  it('It should create a user', async () => {
    const tempAuth0Id = 'userServiceNew';

    const user = await userService.ensureLocalRecordExists(tempAuth0Id);

    expect(user.auth0Id).toEqual(tempAuth0Id);

    await User.deleteMany({ auth0Id: tempAuth0Id });
  });

  it('It should update a user', async () => {
    const updatedFirstName = 'Batman';

    const updated = await userService.updateUser(
      { auth0Id: testUser.auth0Id },
      { firstName: updatedFirstName }
    );

    expect(updated.firstName).toEqual(updatedFirstName);
  });

  it('It should attempt to update a nonexistent user and fail', async () => {
    expect.assertions(1);

    await userService
      .updateUser({ _id: mockObjectId }, { firstName: 'Loki ' })
      .catch((error) => {
        expect(error).toEqual(
          new CustomError({
            ...CORE_ENTITY_NOT_FOUND,
            message: 'The requested user could not be found'
          })
        );
      });
  });

  it('It should get a user', async () => {
    const user = await userService.getUserByQueryOrFail({
      auth0Id: testUser.auth0Id
    });

    expect(user.auth0Id).toEqual(testUser.auth0Id);
  });

  it('It should try get a nonexistent user and fail', async () => {
    expect.assertions(1);

    await userService
      .getUserByQueryOrFail({ _id: mockObjectId })
      .catch((error) => {
        expect(error).toEqual(
          new CustomError({
            ...CORE_ENTITY_NOT_FOUND,
            message: 'The requested user could not be found'
          })
        );
      });
  });
});
