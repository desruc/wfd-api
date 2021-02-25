import catchErrors from '~/core/catchErrors';

import * as userService from '~/services/user';

/**
 * Update the requesting users information
 */
export const updateUser = catchErrors(async (req, res) => {
  const { id } = req.user;

  const updatedUser = await userService.updateUser({ _id: id }, req.body);

  res.success({
    message: 'User updated successfully',
    data: updatedUser
  });
});

/**
 * Get the specified user
 */
export const getUser = catchErrors(async (req, res) => {
  const { userId } = req.params;

  const user = await userService.getUserByQueryOrFail({ _id: userId });

  res.success({
    message: 'User retrieved successfully',
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      createdAt: user.createdAt
    }
  });
});

/**
 * Get the requesting users database record
 */
export const getAuthUser = catchErrors(async (req, res) => {
  const { id: userId } = req.user;

  const user = await userService.getUserByQueryOrFail({ _id: userId });

  res.success({
    message: 'User retrieved successfully',
    data: user
  });
});
