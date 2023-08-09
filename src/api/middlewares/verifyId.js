function verifyId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  }
  res.status(400).json({ error: "Solo se aceptan id's numéricos" });
}

module.exports = verifyId;
