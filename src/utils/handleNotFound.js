function handleNotFound(req, res) {
  res.status(404).render('not-found');
}

module.exports = handleNotFound;
