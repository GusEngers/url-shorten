const app = require('./src/app');
const { db } = require('./src/db');

app.listen(process.env.PORT, () => {
  db.connect()
    .then(() => {
      console.log('Database connected!');
      console.log('Server start on port:', process.env.PORT);
    })
    .catch((err) => console.error('Failed connect database:', err));
});
