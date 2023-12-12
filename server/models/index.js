const User = require('./User');
const Book = require('./Book');
const Sheet = require('./Sheet');
const Category = require('./Category');
const Transaction = require('./Transaction');

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

Sheet.hasMany(Category, {
  foreignKey: 'sheet_id',
});

Category.belongsTo(Sheet, {
  foreignKey: 'sheet_id',
});

Category.hasMany(Transaction, {
  foreignKey: 'category_id',
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id',
});

module.exports = { User, Book, Sheet, Category, Transaction };

