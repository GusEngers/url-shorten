const router = require('express').Router();
const create = require('../controllers/create');
const getUrl = require('../controllers/get');
const verifyBody = require('../middlewares/verifyBody');
const verifyId = require('../middlewares/verifyId');

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
      setTimeout(() => {
        res.redirect('/dashboard');
      }, 10000);
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
  console.log(token)
  const publics = ['hola.com', 'chau.com', 'hola.ar'];

  let pro = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['saludoformal.com']);
    }, 5000);
  });

  const privates = await pro.then((value) => value);
  res.render('dashboard', {
    error: null,
    username: 'Fulano',
    publics,
    privates,
  });
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

module.exports = router;
