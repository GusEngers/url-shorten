const { Router } = require('express');
const { db } = require('../db');
const { checkUserBody } = require('../middlewares/check_user_body');
const { verifyId } = require('../middlewares/verify_id');
const { existsUser } = require('../middlewares/exists_user');

const router = Router();

router.post('/', checkUserBody, async (req, res) => {
  const { username } = req.body;
  try {
    const query = 'INSERT INTO users (username) VALUES ($1)';
    await db.query(query, [username]);
    res
      .status(201)
      .json({ message: `User ${username} created!` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', verifyId, existsUser, async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM users WHERE user_id = $1';
    await db.query(query, [id]);
    res.json({ message: `User with id '${id}' deleted!` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
