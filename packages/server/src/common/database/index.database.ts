import { Database } from 'arangojs';

const db = new Database({
  url: process.env.ARANGODB_CONNECTION_STRING,
  auth: {
    username: process.env.ARANGODB_USERNAME,
    password: process.env.ARANGODB_PASSWORD,
  },
  databaseName: process.env.ARANGODB_DB_NAME,
});

export default db;
