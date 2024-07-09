const express = require('express');
const userRoutes = require('./userRoutes.js');
const todoRoutes = require('./todoRoutes.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express();

router.use(
  '/user',
  userRoutes
);

router.use(
  '/user/:userId/todo',
  authMiddleware,
  todoRoutes
);

module.exports = router;
