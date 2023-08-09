function verifyBody(req, res, next) {
  if (!req.body.link) {
    return res
      .status(400)
      .json({ error: 'Es necesario ingresar un link para acortarlo' });
  }
  const reg =
    /^((https|http|ftp|smtp):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  if (!reg.test(req.body.link)) {
    return res
      .status(400)
      .json({ error: 'El link ingresado no tiene un formato válido' });
  }

  next();
}

module.exports = verifyBody;
