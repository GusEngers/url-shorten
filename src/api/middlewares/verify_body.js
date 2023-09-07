function verifyBody(req, res, next) {
  const errors = [
    'Es requerido el nombre de usuario',
    'Es requerida la contraseña',
    'Es requerido el nombre de usuario y la contraseña',
  ];

  if (!req.body.username && !req.body.password) {
    return res.status(400).render(req.baseUrl, { error: errors[2] });
  }
  if (!req.body.password) {
    return res.status(400).render(req.baseUrl, { error: errors[1] });
  }
  if (!req.body.username) {
    return res.status(400).render(req.baseUrl, { error: errors[0] });
  }
  next();
}

module.exports = verifyBody;
