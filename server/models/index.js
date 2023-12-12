const User = require('./User');
const MovieList = require('./MovieList');
const SavedMovies = require('./SavedMovies');

User.belongsTo(SavedMovies, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

MovieList.belongsTo(User, {
  foreignKey: 'user_id'
});
module.exports = { User, MovieList, SavedMovies };
