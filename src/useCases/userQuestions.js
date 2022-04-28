const User = require("../models/users");

async function getUserQuestions(userId) {
  const user = await User.findById(userId).populate({
    path: "articles",
    select: ["name", "questions"],
    populate: { path: "questions", select: ["question", "user"] },
  });
  const articles = user.articles;

  return articles;
}

module.exports = getUserQuestions;
