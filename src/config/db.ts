import mongoose from 'mongoose';
import logger from '~/core/logger';

const nodeEnv = process.env.NODE_ENV;

const mongoUser = process.env.MONGO_USERNAME || 'mongo';
const mongoPassword = process.env.MONGO_PASSWORD || 'pw';
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const dbName = process.env.MONGO_DB || 'wfd';

let url = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${dbName}?retryWrites=true`;

if (nodeEnv === 'development') {
  url = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${dbName}?authSource=${dbName}`;
}

/**
 * Close mongoose connection before exiting process
 */
const gracefulExit = (): void => {
  mongoose.connection
    .close()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      logger.error(error);
      process.exit(0);
    });
};

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);

/**
 * Initialize the mongoose connection
 */
const initializeDb = async (): Promise<void> => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    useCreateIndex: true,
    useFindAndModify: true
  };

  await new Promise((resolve) => {
    mongoose.connect(url, options, (error) => {
      if (error) {
        logger.error('MONGO: Error connecting to database - ', error);
        process.exit(0);
      } else {
        logger.info('MONGO: Database connection established');
        resolve(null);
      }
    });
  });
};

export default initializeDb;
