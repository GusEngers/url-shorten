const User = require('../models/user');

async function verifyUserExist(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).render('register', {
        error: `El nombre de usuario "${user.username}" ya existe`,
      });
    }
    next();
  } catch (error) {
    res.status(400).render('register', { error: error.message });
  }
}

module.exports = verifyUserExist;
