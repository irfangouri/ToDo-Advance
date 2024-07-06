const express = require('express');
const userRoutes = require('./userRoutes.js');
const todoRoutes = require('./todoRoutes.js');

const routes = express();

routes.use('/user', userRoutes);
routes.use('/user/:userId/todo', todoRoutes);

module.exports = routes;
