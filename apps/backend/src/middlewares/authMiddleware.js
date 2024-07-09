const { decodeAccessToken } = require('../utils/helpers');


const authMiddleware = (req, res, next) => {
  try {
    const { userId } = req.params;
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(403).json({
        Error: `Missing headers in the request, re-check for access-token`,
      });
    }

    const userInfo = decodeAccessToken(accessToken);
    if (userInfo._id !== userId) {
      return res.status(403).json({
        Error: `User not validate, please login again`,
      });
    }

    next();
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
}

module.exports = authMiddleware;
