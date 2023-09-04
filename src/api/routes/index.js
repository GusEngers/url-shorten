const router = require('express').Router();
const createUser = require('../controllers/create_user');
const User = require('../models/user');

/* -- Landing Page -- */
router.get('/', (req, res) => {
  res.render('index');
});

/* -- Register Page and Controller -- */
router
  .route('/register')
  .get((req, res) => {
    res.render('register', { error: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
      await createUser(username, password);
      res.redirect('/dashboard');
    } catch (error) {
      res.render('register', { error: error.message });
    }
  });

/* -- Login Page and Controller -- */
router
  .route('/login')
  .get((req, res) => {
    res.render('login', { error: null });
  })
  .post(async (req, res) => {
    try {
      setTimeout(() => {
        res.redirect('/dashboard');
      }, 10000);
    } catch (error) {
      res.render('login', { error: error.message });
    }
  });

/* -- Dashboard Page and Controller -- */
router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('dashboard', { error: null, users });
  } catch (error) {
    res.render('dashboard', { error: error.message });
  }
});
// router.post('/create', verifyBody, async (req, res) => {
//   try {
//     const data = await create(req.body.link);
//     let path = req.protocol + '://' + req.get('host') + '/r/';
//     res.json({ link: path + data });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/r/:id', verifyId, async (req, res) => {
//   try {
//     const data = await getUrl(req.params.id);
//     res.redirect(data);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.get("/borrar", async (req, res) => {
  await User.deleteMany({})
  res.send('<h1>Base de datos limpia</h1>')
})

module.exports = router;
