const express = require("express");
const useCasesQuestions = require("../useCases/questions");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const allQuestions = await useCasesQuestions.getAllQuestion();

    response.json({
      success: true,
      message: "All questions",
      data: {
        questions: allQuestions,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The questions was not found",
      error: error.message,
    });
  }
});
router.get("/:questionId", async (request, response) => {
  try {
    const questionId = request.params.questionId;
    const questionFound = await useCasesQuestions.getQuestion(questionId);

    response.json({
      success: true,
      message: "The question was found",
      data: {
        question: questionFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The question was not found",
      error: error.message,
    });
  }
});

router.use(auth);

router.post("/", async (request, response) => {
  try {
    const userId = request.validToken.id;

    const articleId = request.params.articleId;
    const dataQuestion = request.body;
    const newQuestion = await useCasesQuestions.createQuestion(
      dataQuestion,
      articleId,
      userId
    );

    if (!articleId || !dataQuestion) {
      throw new Error("You need data");
    }

    response.json({
      success: true,
      message: "The question was created successfully",
      data: {
        question: newQuestion,
        article: articleId,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "The question is not possible to create",
      error: error.message,
    });
  }
});
router.delete("/:questionId", async (request, response) => {
  try {
    const questionId = request.params.questionId;
    const questionDeleted = await useCasesQuestions.deleteQuestion(questionId);

    response.json({
      success: true,
      message: "The question was deleted successfully",
      data: {
        question: questionDeleted,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "The question is not possible to delete",
      error: error.message,
    });
  }
});

module.exports = router;
