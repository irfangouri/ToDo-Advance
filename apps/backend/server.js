const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const dbConnection = require('./src/config/dbConnection');
const routes = require('./src/routes/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

dbConnection();

app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
