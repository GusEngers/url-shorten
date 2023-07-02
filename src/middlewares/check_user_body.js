/**
 * Check if the body has the necessary properties and formats
 */
function checkUserBody(req, res, next) {
  if (!req.body.username || typeof req.body.username !== 'string') {
    return res.status(400).json({
      error:
        "The 'username' property is not present in the body or is different from a string",
    });
  }
  req.body.username = req.body.username.toLowerCase();
  next();
}

module.exports = {
  checkUserBody,
};
