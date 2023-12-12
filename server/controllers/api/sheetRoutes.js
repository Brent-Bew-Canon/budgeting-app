const router = require('express').Router();
const { User, Book, Sheet } = require('../../models'); // Assuming you've imported your models

// /api/sheet/:bookId
router.post('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params; // Get the bookId from the URL
        const { name, grand_total, categories, transactions } = req.body; // Assuming you receive this data for the new sheet

        // Find the book by ID
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Create a new sheet associated with the found book
        const newSheet = await Sheet.create({
            name,
            grand_total,
            categories,
            transactions,
            book_id: book.id, // Set the bookId explicitly when creating the sheet
        });

        res.status(200).json(newSheet);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:book_Id', async (req, res) => {
    try {
        const { book_Id } = req.params; // Get the bookId from the URL

        // Find all sheets associated with the specified book
        const sheets = await Sheet.findAll({
            where: { book_Id },
        });

        res.status(200).json(sheets);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/:sheetId', async (req, res) => {
    try {
        const { sheetId } = req.params; // Get the sheetId from the URL
        const { name, grand_total, categories, transactions } = req.body; // Update data for the sheet

        // Find the sheet by ID
        const sheet = await Sheet.findByPk(sheetId);

        if (!sheet) {
            return res.status(404).json({ message: 'Sheet not found' });
        }

        // Update the sheet attributes
        await sheet.update({
            name,
            grand_total,
            categories,
            transactions,
        });

        res.status(200).json(sheet);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:sheetId', async (req, res) => {
    try {
        const { sheetId } = req.params; // Get the sheetId from the URL

        // Find the sheet by ID and delete it
        const sheet = await Sheet.findByPk(sheetId);

        if (!sheet) {
            return res.status(404).json({ message: 'Sheet not found' });
        }

        await sheet.destroy();

        res.status(200).json({ message: 'Sheet deleted successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
