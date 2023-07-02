/**
 * Check if the id entered is correct
 */
function verifyId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  }
  res.status(400).json({ error: "Only numeric id's are accepted" });
}

module.exports = {
  verifyId,
};
