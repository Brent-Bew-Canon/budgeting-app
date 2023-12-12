const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const sheetRoutes = require('./sheetRoutes');
const transactionRoutes = require('./transactionRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/book', bookRoutes);
router.use('/sheet', sheetRoutes);
router.use('/transaction', transactionRoutes);
router.use('/category', categoryRoutes);



module.exports = router;
