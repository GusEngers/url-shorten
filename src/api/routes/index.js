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
      res.redirect('/dashboard');
    } catch (error) {
      res.render('register', { error: error.message });
    }
  });

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
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
