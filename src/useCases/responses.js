const Response = require("../models/responses");

function getAllResponses() {
  return Response.find({}).populate("user", { name: 1 }, "question", {
    question: 1,
  });
}
function getResponse(responseId) {
  return Response.findById(responseId);
}
function createResponse(dataResponse, questionId) {
  const { response } = dataResponse;

  return Response.create({ response, question: questionId });
}
module.exports = { getAllResponses, getResponse, createResponse };
