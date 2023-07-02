const { db } = require('../db');

/**
 * Check if there are user records in the database based on their id
 */
async function existsUser(req, res, next) {
  try {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const { rows } = await db.query(query, [req.params.id]);

    if (!rows.length) {
      return res
        .status(404)
        .json({ error: `User with id ${req.params.id} does not exist` });
    }
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: 'An error occurred while executing the database query' });
  }
}

module.exports = {
  existsUser,
};
