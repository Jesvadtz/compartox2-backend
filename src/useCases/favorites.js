const Favorite = require("../models/favorites");

function getAllFavorites() {
  return Favorite.find({}).populate("article", {
    name: 1,
    price: 1,
    images: 1,
    description: 1,
  });
}
function createFavorite(articleId) {
  return Favorite.create({ article: articleId });
}
function deleteFavorite(articleId) {
  return Favorite.findByIdAndDelete(articleId);
}

module.exports = { getAllFavorites, createFavorite, deleteFavorite };
