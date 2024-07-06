const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
}

const comparePassword = async (password, encryptedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
  return isPasswordValid;
}

const getAccessToken = (username, password) => {
  const accessToken = jwt.sign(
    { username, password},
    JWT_SECRET_KEY
  );
  return accessToken;
}

module.exports = {
  encryptPassword,
  comparePassword,
  getAccessToken,
};
