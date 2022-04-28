const Response = require("../models/responses");
const Question = require("../models/questions");

function getAllResponses() {
  return Response.find({}).populate("user", { name: 1 }, "question", {
    question: 1,
  });
}

function getResponse(responseId) {
  return Response.findById(responseId);
}

async function createResponse(dataResponse, questionId, userId) {
  const { response } = dataResponse;

  const question = await Question.findById(questionId).populate("article", {
    user: 1,
  });

  const seller = question.article.user.toString();

  if (userId !== seller) {
    throw new Error("Only the seller can respond the questions");
  }

  const newResponse = Response({
    response,
    question: questionId,
    user: userId,
  });
  const savedResponse = await newResponse.save();

  question.response = savedResponse._id;
  await question.save();

  return savedResponse;
}

function deleteResponse(responseId) {
  return Response.findByIdAndDelete(responseId);
}

module.exports = {
  getAllResponses,
  getResponse,
  createResponse,
  deleteResponse,
};
