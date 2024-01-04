const router = require('express').Router();
const { User, Book, Sheet, Transaction, Category } = require('../../models'); // Assuming you've imported your models

// /api/category/:sheetId
router.post('/:sheetId', async (req, res) => {
    try {
        const { sheetId } = req.params; // Get the sheetId from the URL
        const { name, total } = req.body; // Assuming you receive this data for the new cateogry

        // Find the sheet by ID
        const sheet = await Sheet.findByPk(sheetId);

        if (!sheet) {
            return res.status(404).json({ message: 'Sheet not found' });
        }

        // Create a new category associated with the found sheet
        const newCategory = await Category.create({
            name,
            total,
            sheet_id: sheetId, // Set the sheet_id explicitly when creating the sheet
        });
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:sheet_id', async (req, res) => {
    try {
        const { sheet_id } = req.params; // Get the sheet id from the URL

        // Find all cats associated with the specified sheet
        const categories = await Category.findAll({
            where: { sheet_id },
            include: [
                {
                    model: Transaction, // Include the Transaction model
                    attributes: ['id', 'name', 'amount'], // Specify the attributes you want to retrieve from the Transaction model
                }
            ]
        });

        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update category total
// /api/category/:category_id
router.put('/:category_id', async (req, res) => {
    try {
        const { category_id } = req.params; // Get the category id from the URL
        const { total } = req.body; // Update data for the sheet

        // Find the category by ID
        const category = await Category.findByPk(category_id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the sheet attributes
        await category.update({
            total
        });

        res.status(200).json(sheet);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;