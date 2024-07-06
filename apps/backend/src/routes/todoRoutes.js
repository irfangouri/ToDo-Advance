const express = require('express');
const todoController = require('../controllers/todoController.js');

const todo = express();

todo.post('/', todoController.createTodo);
todo.get('/:todoId', todoController.getTodo);
todo.get('/', todoController.getAllTodos);
todo.put('/:todoId', todoController.updateTodo);
todo.delete('/:todoId', todoController.deleteTodo);

module.exports = todo;
