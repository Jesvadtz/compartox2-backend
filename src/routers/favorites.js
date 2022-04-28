const express = require("express");
const useCasesFavorites = require("../useCases/favorites");

const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
  try {
    const userId = request.params.userId;
    const allFavorites = await useCasesFavorites.getUserFavorites(userId);

    response.json({
      success: true,
      message: "All favorites",
      data: {
        favorites: allFavorites,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "The favorites was not found",
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const userId = request.params.userId;
    const articleId = request.body.articleId;
    const newFavorite = await useCasesFavorites.createFavorite(
      articleId,
      userId
    );

    response.json({
      success: true,
      message: "The favorite was created successfully",
      data: {
        favorite: newFavorite,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "The favorites was not created",
      error: error.message,
    });
  }
});

router.delete("/:articleId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const articleId = request.params.articleId;
    const favoriteDeleted = await useCasesFavorites.deleteFavorite(
      articleId,
      userId
    );

    response.json({
      success: true,
      message: "The favorite was deleted",
      data: {
        favorite: favoriteDeleted,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The favorites was not deleted",
      error: error.message,
    });
  }
});

module.exports = router;
