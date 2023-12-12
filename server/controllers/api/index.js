const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const sheetRoutes = require('./sheetRoutes');

router.use('/users', userRoutes);
router.use('/book', bookRoutes);
router.use('/sheet', sheetRoutes);


module.exports = router;
