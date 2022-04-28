const express = require("express");
const useCasesResponses = require("../useCases/responses");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const allResponses = await useCasesResponses.getAllResponses;

    response.json({
      success: true,
      message: "All responses",
      data: {
        responses: allResponses,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The responses was not found",
      error: error.message,
    });
  }
});
router.get("/:responseId", async (request, response) => {
  try {
    const responseId = request.params.responseId;
    const responseFound = await useCasesResponses.getResponse(responseId);

    response.json({
      success: true,
      message: "Response found",
      data: {
        response: responseFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The responses was not found",
      error: error.message,
    });
  }
});

router.use(auth);

router.post("/", async (request, response) => {
  try {
    const userId = request.validToken.id;

    const questionId = request.params.questionId;
    const dataResponse = request.body;
    const newResponse = await useCasesResponses.createResponse(
      dataResponse,
      questionId,
      userId
    );

    response.json({
      success: true,
      message: "The response was created successfully",
      data: {
        response: newResponse,
        question: questionId,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "The responses was not created",
      error: error.message,
    });
  }
});
router.delete("/:responseId", async (request, response) => {
  try {
    const responseId = request.params.responseId;
    const responseDeleted = await useCasesResponses.getResponse(responseId);

    response.json({
      success: true,
      message: "Response was deleted successfully",
      data: {
        response: responseDeleted,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "The responses was not deleted",
      error: error.message,
    });
  }
});

module.exports = router;
