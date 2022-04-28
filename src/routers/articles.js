const express = require("express");
const useCasesArticles = require("../useCases/articles");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const allArticles = await useCasesArticles.getAllArticles();

    response.json({
      success: true,
      message: "All Articles",
      data: {
        articles: allArticles,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Articles not found",
      error: error.message,
    });
  }
});
router.get("/:articleId", async (request, response) => {
  try {
    const articleId = request.params.articleId;
    const articleFound = await useCasesArticles.getArticle(articleId);

    response.json({
      success: true,
      message: "Article found",
      data: {
        article: articleFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "Article not found",
      error: error.message,
    });
  }
});

router.use(auth);

router.post("/", async (request, response) => {
  try {
    const dataArticle = request.body;
    const userId = request.params.userId;

    if (!userId || !dataArticle) {
      throw new Error("You need data");
    }

    const newArticle = await useCasesArticles.createArticle(
      dataArticle,
      userId
    );
    response.json({
      succes: true,
      message: "Article created succesfully",
      data: {
        article: newArticle,
        user: userId,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "Error to create article",
      error: error.message,
    });
  }
});
router.patch("/:articleId", async (request, response) => {
  try {
    const articleId = request.params.articleId;
    const dataToUpdate = request.body;
    const articleUpdate = await useCasesArticles.updateArticle(
      articleId,
      dataToUpdate
    );
    response.json({
      success: true,
      message: "Article was update successfully",
      data: {
        article: articleUpdate,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "Error to update article",
      error: error.message,
    });
  }
});
router.delete("/:articleId", async (request, response) => {
  try {
    const articleId = request.params.articleId;
    const articleDeleted = await useCasesArticles.deleteArticle(articleId);

    response.json({
      success: true,
      message: "Article was deleted successfully",
      data: {
        article: articleDeleted,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "Error to delete article",
      error: error.message,
    });
  }
});

module.exports = router;
