const userService = require('../services/userServices.js');

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const response = await userService.registerUser(username, password);

    if (response?.error) {
      return res.status(403).json({
        Error: response.error,
      });
    }

    res.status(201).json({
      id: response._id,
      username: response.username,
    });
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const response = await userService.loginUser(username, password);

    if (response?.error) {
      return res.status(403).json({
        Error: response.error,
      });
    }

    if (response?.notFound) {
      return res.status(404).json({
        Error: response.notFound,
      });
    }

    res.status(200).json({
      'id': response.id,
      'accessToken': response,
    });
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
