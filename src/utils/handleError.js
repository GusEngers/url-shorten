function handleError(err, req, res, next) {
  res.status(500).send(
    `<h1>Lo sentimos, un error inesperado ha ocurrido</h1>
    <p>${err.message}</p>`
  );
}

module.exports = handleError;
