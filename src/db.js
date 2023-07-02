const { Pool } = require('pg');
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

/**
 * * Create users model if not exists
 */
pool.query(
  `CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE
  );`
);

/**
 * * Create urls model if not exists
 */
pool.query(
  `CREATE TABLE IF NOT EXISTS urls(
    url_id SERIAL PRIMARY KEY,
    original VARCHAR,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );`
);

module.exports = {
  db: pool,
};
