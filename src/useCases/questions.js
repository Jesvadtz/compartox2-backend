const Question = require("../models/questions");
const Article = require("../models/articles");

function getAllQuestion() {
  return Question.find({})
    .populate("user", { name: 1, lastname: 1 })
    .populate("article", { user: 1 })
    .populate("response", { response: 1 })
    .sort({ createdAt: "desc" });
}

function getQuestion(questionId) {
  return Question.findById(questionId).populate("user", {
    name: 1,
    lastname: 1,
  });
}

async function createQuestion(dataQuestion, articleId, userId) {
  const { question } = dataQuestion;

  const article = await Article.findById(articleId);
  const newQuestion = Question({ question, article: articleId, user: userId });
  const savedQuestion = await newQuestion.save();

  article.questions.addToSet(savedQuestion._id);
  await article.save();

  return savedQuestion;
}

function deleteQuestion(questionId) {
  return Question.findByIdAndDelete(questionId);
}

module.exports = {
  getAllQuestion,
  getQuestion,
  createQuestion,
  deleteQuestion,
};
