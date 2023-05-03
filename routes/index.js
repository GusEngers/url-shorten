const { Router } = require('express');
const generateIdentifier = require('../controllers/generate_identifier');
const router = Router();

router.get('/:id', async (req, res) => {
  try {
    res.redirect('http://gus-engers.vercel.app/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/generate', async (req, res) => {
  const { url } = req.body;
  try {
    let data = await generateIdentifier(url);
    let path = req.protocol + '://' + req.get('host') + '/';
    res.status(201).json({ data: path + data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
