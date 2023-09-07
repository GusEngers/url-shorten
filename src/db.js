const { connect } = require('mongoose');
require('dotenv').config();

async function db() {
  try {
    await connect(process.env.DB_URI);
    console.log('Database connecting sucessfully');
  } catch (error) {
    console.error('Error connecting database:', error);
    process.exit(1);
  }
}

module.exports = db;
