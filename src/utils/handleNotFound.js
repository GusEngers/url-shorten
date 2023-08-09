function handleNotFound(req, res) {
  res.status(404).send(`<h1>La ruta a la cual quiere ingresar no existe</h1>`);
}

module.exports = handleNotFound;
