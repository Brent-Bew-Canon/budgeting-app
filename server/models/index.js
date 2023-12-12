const User = require('./User');
const Book = require('./Book');
const Sheet = require('./Sheet');

// Associations
User.hasOne(Book, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

Book.hasMany(Sheet, {
  foreignKey: 'book_id',
});

Sheet.belongsTo(Book, {
  foreignKey: 'book_id',
});

module.exports = { User, Book, Sheet };

