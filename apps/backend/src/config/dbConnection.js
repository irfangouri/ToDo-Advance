const mongoose = require('mongoose');

const dbConnection = () => {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_URL = process.env.DB_URL;
  const DB_NAME = process.env.DB_NAME;

  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}`, {
    dbName: DB_NAME,
  })
    .then(() => {
      console.log('Successfully connected with Database')
    })
    .catch(() => {
      console.log('Error occurred while connecting with Database')
    });
}

module.exports = dbConnection;
