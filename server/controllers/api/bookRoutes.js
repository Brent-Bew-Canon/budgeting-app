const router = require('express').Router();
const { Book, User, Sheet } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const { userId, title } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new book associated with the found user
    const newBook = await Book.create({
      title,
      user_id: user.id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get route to get all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Sheet, // Include the Sheet model
          attributes: ['id', 'name', 'grand_total', 'categories', 'transactions'], // Specify the attributes you want to retrieve from the Sheet model
        },
        {
          model: User, // Include the User model
          attributes: ['id', 'name', 'email'], // Specify the attributes you want to retrieve from the User model
        },
      ],
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }
    // res status with message saying "book {bookid} deleted"
    res.status(200).json({ message: `Book ${req.params.id} deleted!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;