/**
 * MongoDb will run any scripts placed inside /docker-entrypoint-initdb.d
 * Use this script to create any users needed for local dev. It will be volume
 * mounted into the docker container by the docker-compose file.
 */
const db = connect(`mongodb://localhost/wfd`);

db.createUser({
  user: 'mongo',
  pwd: 'pw',
  roles: [{ role: 'readWrite', db: 'wfd' }]
});
