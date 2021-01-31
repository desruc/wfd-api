import mongoose from 'mongoose';
/* eslint-disable-next-line */
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connect = async (): Promise<void> => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  await mongoose.connect(uri, mongooseOpts, (error) => {
    if (error) {
      process.exit(0);
    }
  });
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async (): Promise<void> => {
  const { collections } = mongoose.connection;

  /* eslint-disable-next-line */
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
