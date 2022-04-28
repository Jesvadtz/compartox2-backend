const express = require("express");
const useCasesUserQuestions = require("../useCases/userQuestions");

const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const userId = request.params.userId;
    const allQuestions = await useCasesUserQuestions(userId);

    response.json({
      success: true,
      message: "All questions",
      data: {
        questions: allQuestions,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "The questions was not found",
      error: error.message,
    });
  }
});

module.exports = router;
