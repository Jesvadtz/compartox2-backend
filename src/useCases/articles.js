const Article = require("../models/articles");
const User = require("../models/users");

function getArticle(articleId) {
  return Article.findById(articleId)
    .populate("user", {
      name: 1,
      lastname: 1,
      city: 1,
      state: 1,
      number: 1,
      email: 1,
    })
    .populate("questions", { question: 1, user: 1 });
}

function getAllArticles() {
  return Article.find({})
    .populate("user", {
      name: 1,
      lastname: 1,
      city: 1,
      state: 1,
      number: 1,
      email: 1,
    })
    .sort({ createdAt: "desc" });
}

async function createArticle(dataArticle, userId) {
  const { name, type, description, price, images, author, title, editorial } =
    dataArticle;

  const user = await User.findById(userId);
  const newArticle = Article({
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
  const savedArticle = await newArticle.save();

  user.articles.addToSet(savedArticle._id);
  await user.save();

  return savedArticle;
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
