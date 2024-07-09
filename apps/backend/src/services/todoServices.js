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
  const todos = await Todo.find(
    { userId },
    { }
  );

  return todos;
}

const getTodo = async (todoId) => {
  const todo = await Todo.findById(todoId);
  return todo;
}

const updateTodo = async () => {

}

module.exports = {
  createTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
  updateTodo,
}