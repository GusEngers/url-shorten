const router = require('express').Router();
const path = require('path');
const create = require('../controllers/create');
const getUrl = require('../controllers/get');
const verifyBody = require('../middlewares/verifyBody');
const verifyId = require('../middlewares/verifyId');

router.get('/', (req, res) => {
  let data = path.join(__dirname, '..', '..', 'public', 'index.html');
  res.sendFile(data);
});
router.post('/create', verifyBody, async (req, res) => {
  try {
    const data = await create(req.body.link);
    let path = req.protocol + '://' + req.get('host') + '/r/';
    res.json({ link: path + data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/r/:id', verifyId, async (req, res) => {
  try {
    const data = await getUrl(req.params.id);
    res.redirect(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
