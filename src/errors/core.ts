interface CustomError {
  code: string;
  message: string;
  status: number;
  description?: string;
}

export const CORE_UNAUTHORIZED: CustomError = {
  code: 'core/unauthorized',
  message: 'You do not have permission to access that resource',
  status: 401,
  description: 'Called when the jwt token is expired or not included'
};

export const CORE_UNPROCESSABLE_ENTITY: CustomError = {
  code: 'core/unprocessable-entity',
  message: 'There was something wrong with your request',
  status: 422
};

export const CORE_UNPROCESSABLE_DATABASE_ENTITY: CustomError = {
  code: 'core/unprocessable-database-entity',
  message: 'There was something wrong with your request',
  status: 422,
  description:
    'Called when mongoose throws an error. Usually when there is an improperly formatted object being saved'
};

export const CORE_ENTITY_NOT_FOUND: CustomError = {
  code: 'core/entity-not-found',
  message: 'The requested resource could not be found',
  status: 404
};
