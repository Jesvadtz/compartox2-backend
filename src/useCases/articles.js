const Article = require("../models/articles");

function getArticle(articleId) {
  return Article.findById(articleId).populate("user", {
    name: 1,
    lastname: 1,
    city: 1,
    state: 1,
  });
  // .populate("questions", { question: 1, user: 1 });
}
function getAllArticles() {
  return Article.find({})
    .populate("user", { name: 1, lastname: 1, city: 1, state: 1 })
    .sort({ createdAt: "desc" });
}
function createArticle(dataArticle, userId) {
  const { name, type, description, price, images, author, title, editorial } =
    dataArticle;

  return Article.create({
    name,
    type,
    description,
    price,
    images,
    author,
    title,
    editorial,
    user: userId,
  });
}
function updateArticle(articleId, dataToUpdate) {
  return Article.findByIdAndUpdate(articleId, dataToUpdate, { new: true });
}
function deleteArticle(articleId) {
  return Article.findByIdAndDelete(articleId);
}

module.exports = {
  getArticle,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
