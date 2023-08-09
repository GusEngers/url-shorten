const app = require('./src/app');
const { db } = require('./src/db');
require('dotenv').config();

db.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server listen on port: ${process.env.PORT} and database connected!`
      );
    });
  })
  .catch((err) => {
    console.error('Database not connected:', err);
  });
