const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.render('finish_session', {
      error: 'Para ingresar a este sitio debe iniciar sesión primero',
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(verify._id)
    if(!user) {
      res.cookie('token', null, { expires: new Date(0) });
      return res.render('finish_session', {
      error: 'Parece que el usuario no existe, prueba volver a iniciar sesión o vuelve a registrarte',
    });
    }
    req.user = verify;
    next();
  } catch (error) {
    res.cookie('token', null, { expires: new Date(0) });
    res.render('finish_session', {
      error: 'La sesión a caducado, vuelve a iniciar sesión',
    });
  }
}

module.exports = authUser;
