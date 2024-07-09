const authValidation = require('../validations/userValidation.js');
const User = require('../models/userModel.js');
const { encryptPassword, comparePassword, getAccessToken } = require('../utils/helpers.js');

const registerUser = async (username, password) => {
  const response = authValidation(username, password);
  if (response?.error) {
    return {
      error: response.error,
    };
  }

  const userExist = await User.findOne({ username });
  if (userExist) {
    return {
      error: 'Email already in use, please try login or register using different email',
    };
  }

  const encryptedPassword = await encryptPassword(password);
  const user = new User({
    username,
    password: encryptedPassword,
  });
  user.save();
  return user;
}

const loginUser = async (username, password) => {
  const response = authValidation(username, password);
  if (response?.error) {
    return {
      error: response.error,
    };
  }

  const userExist = await User.findOne({ username });
  if (!userExist) {
    return {
      notFound: 'User not found, please register first'
    }
  }

  const isPasswordValid = await comparePassword(password, userExist.password);
  if (!isPasswordValid) {
    return {
      error: 'Password is incorrect, please enter correct password',
    };
  }

  const accessToken = getAccessToken(userExist._id, username, password);
  return accessToken;
}

module.exports = {
  registerUser,
  loginUser,
};
