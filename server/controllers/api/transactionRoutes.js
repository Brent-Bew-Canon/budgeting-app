const router = require('express').Router();
const { User, Book, Sheet, Transaction, Category } = require('../../models'); // Assuming you've imported your models

// /api/transaxtion/:transactionId
router.post('/:category_id', async (req, res) => {
    try {
        const { category_id } = req.params; // Get the sheetId from the URL
        const { name, amount } = req.body; // Assuming you receive this data for the new cateogry

        // Find the sheet by ID
        const category = await Category.findByPk(category_id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new category associated with the found sheet
        const newTransaction = await Transaction.create({
            name,
            amount,
            category_id: category.id, // Set the category_id explicitly when creating the sheet
        });
        res.status(200).json(newTransaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:category_id', async (req, res) => {
    try {
        const { category_id } = req.params; // Get the category id from the URL

        // Find all transactions associated with the specified category
        const transactions = await Transaction.findAll({
            where: { category_id },
        });

        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;