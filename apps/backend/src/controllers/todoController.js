const todoService = require('../services/todoServices.js');

const createTodo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const response = await todoService.createTodo(userId, data);

    if (response?.error) {
      return res.status(403).json({
        Error: response.error,
      });
    }

    res.status(201).json({
      todo: response,
    });
  } catch (err) {
    next(err);
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const todo = await todoService.deleteTodo(todoId);
    if (!todo) {
      return res.status(404).json({
        Error: `Todo with id ${todoId} not found`,
      });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
}

const getAllTodos = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const todos = await todoService.getAllTodos(userId);
    if (!todos) {
      return res.status(404).json({
        Error: `Something went wrong, Please try again later`,
      });
    }

    res.status(200).json({
      todos
    });
  } catch (err) {
    next(err);
  }
}

const getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const todo = await todoService.getTodo(todoId);
    if (!todo) {
      return res.status(404).json({
        Error: `Todo with id ${todoId} not found.`,
      });
    }

    res.status(200).json({
      todo,
    });
  } catch (err) {
    next(err);
  }
}

const updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const data = req.body;

    const updatedTodo = await todoService.updateTodo(todoId, data);
    if (!updatedTodo) {
      return res.status(404).json({
        Error: `Todo with id ${todoId} not found`,
      });
    }

    console.log('Updated todo: ', updatedTodo);
    res.status(200).json({
      todo: updatedTodo,
    });
  } catch (err) {
    next(err);
  }
}

const updateIsComplete = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const todo = await todoService.updateIsComplete(todoId);
    if (!todo) {
      return res.status(404).json({
        Error: `Todo with id ${todoId} not found`,
      });
    }

    res.status(200).json({
      todo,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  updateIsComplete
}
