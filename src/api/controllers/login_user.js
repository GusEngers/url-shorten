const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function loginUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error(`El usuario ${username} no existe`);

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new Error('La contraseña indicada no coincide');
    
    return jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_TOKEN,
      { expiresIn: '1 day' }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = loginUser;
