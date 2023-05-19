const { Router } = require('express');
const generateIdentifier = require('../controllers/generate_identifier');
const { getUrl, getUrls } = require('../controllers/get_url');
const router = Router();

router.get('/', async (req, res) => {
  try {
    let data = await getUrls();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getUrl(id);
    res.redirect(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/generate', async (req, res) => {
  const { original } = req.body;
  try {
    let path = req.protocol + '://' + req.get('host') + '/';
    let url = await generateIdentifier(path, original);
    res.status(201).json({ url });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
