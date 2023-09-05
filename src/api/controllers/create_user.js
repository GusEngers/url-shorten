const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function createUser(username, password) {
  try {
    const hash = await hashPassword(password);
    const user = new User({ username, password: hash });
    await user.save();
    return jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_TOKEN,
      { expiresIn: '1 day' }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = createUser;
