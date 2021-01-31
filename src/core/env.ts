const env = {
  EXPRESS_PORT: process.env.EXPRESS_PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DB: process.env.MONGO_DB,
  AUTH0_ISSUER: process.env.AUTH0_ISSUER,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  CLIENT_ORIGIN_URL: process.env.CLIENT_ORIGIN_URL
};

export default env;
