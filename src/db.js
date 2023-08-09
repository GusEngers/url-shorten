const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString:
    process.env.DB_URI ?? 'postgresql://postgres:12345@localhost/test',
});

pool.query(
  `CREATE TABLE IF NOT EXISTS links(
  id SERIAL PRIMARY KEY,
  original VARCHAR
  );`
);

module.exports = {
  db: pool,
};
