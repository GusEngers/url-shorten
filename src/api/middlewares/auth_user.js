const jwt = require('jsonwebtoken');
require('dotenv').config();

function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.render('finish_session', {
      error: 'Para ingresar a este sitio debe iniciar sesión primero',
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_TOKEN);
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
