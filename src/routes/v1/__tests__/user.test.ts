import supertest, { SuperTest } from 'supertest';

import app from '~/core/app';

import * as dbHandler from '~/config/jest/dbHandler';

import User from '~/models/user';

jest.mock('~/core/logger');
jest.mock('~/middleware/auth');

const request: SuperTest<supertest.Test> = supertest(app());

const testUser = {
  auth0Id: 'userRoutes',
  firstName: 'userRoutes',
  lastName: 'userRoutes'
};

describe('User Route Tests', () => {
  let userId = '';

  beforeAll(async () => {
    await dbHandler.connect();
    const user = await new User(testUser).save();
    userId = user.id;
  });

  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  it('Get the auth user mongo record', async () => {
    const result = await request
      .get('/v1/users')
      .set('Authorization', userId)
      .expect('Content-Type', /json/)
      .expect(200);

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    expect(result.body.message).toBe('User retrieved successfully');
    expect(result.body.data.firstName).toEqual(testUser.firstName);
    expect(result.body.data.lastName).toEqual(testUser.lastName);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  });

  it('Update the auth users mongo record', async () => {
    const updatedLastName = 'updatedLastName';

    const result = await request
      .put('/v1/users')
      .send({ firstName: testUser.firstName, lastName: updatedLastName })
      .set('Authorization', userId)
      .expect('Content-Type', /json/)
      .expect(200);

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    expect(result.body.message).toBe('User updated successfully');
    expect(result.body.data.firstName).toEqual(testUser.firstName);
    expect(result.body.data.lastName).toEqual(updatedLastName);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  });

  it('Get a users mongo record', async () => {
    const result = await request
      .get(`/v1/users/${userId}`)
      .set('Authorization', userId)
      .expect('Content-Type', /json/)
      .expect(200);

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    expect(result.body.message).toBe('User retrieved successfully');
    expect(result.body.data.firstName).toEqual(testUser.firstName);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  });
});
