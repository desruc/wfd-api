import express, { Router } from 'express';

import { ensureAuthenticated } from '~/middleware/auth';
import validate from '~/middleware/validate';

import * as userValidators from '~/validators/user';

import * as userController from '~/controllers/v1/users';

export default (): Router => {
  const router = express.Router();

  /**
   * PUT: Update user
   */
  router.put(
    '/',
    ensureAuthenticated,
    validate(userValidators.update),
    userController.updateUser
  );

  /**
   * GET: Get the auth users mongo record
   */
  router.get('/', ensureAuthenticated, userController.getAuthUser);

  /**
   * GET: Get the specified users mongo record
   */
  router.get('/:userId', userController.getUser);

  return router;
};
