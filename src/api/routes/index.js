const router = require('express').Router();
const createUrl = require('../controllers/create_url');
const createUser = require('../controllers/create_user');
const deleteUrl = require('../controllers/delete_url');
const loginUser = require('../controllers/login_user');
const authUser = require('../middlewares/auth_user');
const existToken = require('../middlewares/exist_token');
const verifyBody = require('../middlewares/verify_body');
const verifyUserExist = require('../middlewares/verify_user_exist');
const User = require('../models/user');
const Url = require('../models/user');

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
  .post(verifyBody, verifyUserExist, async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await createUser(username, password);
      res.cookie('token', token);
      res.redirect('/dashboard');
    } catch (error) {
      res.render('register', { error: error.message });
    }
  });

/* -- Login Page and Controller -- */
router
  .route('/login')
  .get(existToken, (req, res) => {
    res.render('login', { error: null });
  })
  .post(verifyBody, async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await loginUser(username, password);
      res.cookie('token', token);
      res.redirect('/dashboard');
    } catch (error) {
      res.render('login', { error: error.message });
    }
  });

/* -- Dashboard Page and Controller -- */
router.get('/dashboard', authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('privates publics');
    res.render('dashboard', { user });
  } catch (error) {
    res.render('finish-session', { error: error.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    let path = req.protocol + '://' + req.get('host') + '/r/';
    await createUrl({
      token: req.cookies.token,
      type: req.query.type,
      path,
      data: req.body,
    });
    res.redirect('/dashboard');
  } catch (error) {
    res.render('finish-session', { error: error.message });
  }
});

router.delete('/del', async (req, res) => {
  try {
    await deleteUrl({
      token: req.cookies.token,
      id_url: req.query.id,
      type: req.query.type,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    res.render('finish-session', { error: error.message });
  }
});

// router.get('/r/:id', verifyId, async (req, res) => {
//   try {
//     const data = await getUrl(req.params.id);
//     res.redirect(data);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.get('/borrar', async (req, res) => {
  res.cookie('token', null, { expires: new Date(0) });
  await User.deleteMany({});
  await Url.deleteMany({});
  res.send('<h1>Base de datos limpia</h1>');
});

module.exports = router;
