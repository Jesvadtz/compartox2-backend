const Article = require("../models/articles");
const User = require("../models/users");

async function getUserFavorites(userId) {
  const user = await User.findById(userId);
  const favorites = user.favorites;

  return favorites;
}

async function createFavorite(articleId, userId) {
  const favorite = articleId;
  const user = await User.findById(userId);

  user.favorites = user.favorites.concat(favorite);
  await user.save();
}

async function deleteFavorite(articleId, userId) {
  const user = await User.findById(userId);
  user.favorites.pull(articleId);

  await user.save();
}

module.exports = { getUserFavorites, createFavorite, deleteFavorite };
