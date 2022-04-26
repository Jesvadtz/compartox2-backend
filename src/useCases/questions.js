const Question = require("../models/questions");

function getAllQuestion() {
  return Question.find({})
    .populate("user", { name: 1 }, "response", { createdAt: 1, response: 1 })
    .sort({ createdAt: "desc" });
}
function getQuestion(questionId) {
  return Question.findById(questionId).populate("user", { name: 1 });
}
function createQuestion(dataQuestion, articleId, userId) {
  const { question } = dataQuestion;
  return Question.create({ question, article: articleId, user: userId });
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
