const jwt = require('jsonwebtoken');
require('dotenv').config();

function getUserWithToken(token) {
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    return user._id;
  } catch (_) {
    throw new Error('Un error ocurrió al procesar la información del usuario');
  }
}

module.exports = getUserWithToken;
