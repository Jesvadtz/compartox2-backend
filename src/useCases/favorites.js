const User = require("../models/users");

async function getUserFavorites(userId) {
  const user = await User.findById(userId);
  const favorites = user.favorites;

  return favorites;
}

async function createFavorite(articleId, userId) {
  const favorite = articleId;
  const user = await User.findById(userId);

  user.favorites.addToSet(favorite);
  await user.save();
  return user.favorites;
}

async function deleteFavorite(articleId, userId) {
  const user = await User.findById(userId);
  user.favorites.pull(articleId);

  await user.save();
  return user.favorites;
}

module.exports = { getUserFavorites, createFavorite, deleteFavorite };
