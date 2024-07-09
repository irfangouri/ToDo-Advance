const mongoose = require('mongoose');
const Todo = require('../models/todoModel.js');
const todoValidation = require('../validations/todoValidation.js');

const createTodo = async (userId, data) => {
  const isTodoValidate = todoValidation(data);
  if (isTodoValidate?.error) {
    return {
      error: isTodoValidate.error,
    };
  }

  const todoExist = await Todo.findOne({
    userId,
    title: data.title,
    description: data.description
  });

  if (todoExist) {
    return {
      error: `Todo already entered, please change the title or description`,
    };
  }

  const todo = new Todo({
    userId,
    title: data.title,
    description: data.description,
    startDate: data.startDate,
    dueDate: data.dueDate,
  });
  todo.save();

  return todo;
}

const deleteTodo = async (todoId) => {
  const todo = await Todo.findByIdAndDelete(todoId);
  return todo;
}

const getAllTodos = async (userId) => {
  const todos = await Todo.find({ userId });
  console.log('Todos: ', todos);
  return todos;
}

const getTodo = async (todoId) => {
  const todo = await Todo.findById(todoId);
  return todo;
}

const updateTodo = async (todoId, data) => {
  const todo = await getTodo(todoId);
  const { title, description } = data;

  if (!todo) {
    return null;
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId },
    { $set: {
      title: title ? title : todo.title,
      description: description ? description : todo.description,
    }},
    { new: true },
  );

  return updatedTodo;
}

const updateIsComplete = async (todoId) => {
  const todo = await getTodo(todoId);

  if (!todo) {
    return null;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    { _id: todoId },
    { isCompleted: !todo.isCompleted },
    { new: true },
  );

  return updatedTodo;
}

module.exports = {
  createTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  updateIsComplete,
}