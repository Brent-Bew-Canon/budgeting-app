const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.sendFile(__dirname + './index.html', {
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/test', async (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
