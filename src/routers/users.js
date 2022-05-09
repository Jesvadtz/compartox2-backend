const express = require("express");
const usesCasesUsers = require("../useCases/users");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allUsers = await usesCasesUsers.getAllUsers();

    response.json({
      success: true,
      message: "All users",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error at get all users",
      error: error.message,
    });
  }
});

router.get("/me", auth, async (request, response) => {
  try {
    const userId = request.user.id;
    console.log("userId", userId);
    const userFound = await usesCasesUsers.getUser(userId);

    response.json({
      success: true,
      message: "User found successfully",
      data: {
        user: userFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The user not found",
      error: error.message,
    });
  }
});

router.get("/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const userFound = await usesCasesUsers.getUser(userId);

    response.json({
      success: true,
      message: "User found successfully",
      data: {
        user: userFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "The user not found",
      error: error.message,
    });
  }
});
router.post("/signup", async (request, response) => {
  try {
    const userData = request.body;
    const userCreated = await usesCasesUsers.signUp(userData);

    response.json({
      success: true,
      message: "User was created successfully",
      data: {
        user: userCreated,
      },
    });
  } catch (error) {
    response.json({
      succes: false,
      message: "User could not register",
      error: error.message,
    });
  }
});
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await usesCasesUsers.login(email, password);

    response.json({
      success: true,
      message: "User logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "User not logged",
      error: error.message,
    });
  }
});

router.use(auth);

router.patch("/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const dataUser = request.body;
    const userToken = request.validToken;

    if (userId != userToken.id) {
      throw new Error("You don't have authorization to modify this");
    }

    const userUpdate = await usesCasesUsers.updateUser(userId, dataUser, {
      new: true,
    });

    if (!userUpdate) throw new Error("User not found");

    response.json({
      success: true,
      message: "User was update",
      data: {
        user: userUpdate,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      success: false,
      message: "User not updated",
      error: error.message,
    });
  }
});
router.delete("/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const userDeleted = await usesCasesUsers.deleteUser(userId);
    const userToken = request.validToken;

    if (userId != userToken.id) {
      throw new Error("You don't have authorization to modify this");
    }

    if (!userDeleted) throw new Error("User not found");

    response.json({
      success: true,
      message: "User was deleted",
      data: {
        user: userDeleted,
      },
    });
  } catch (error) {
    response.json({
      success: false,
      message: "User could not be deleted",
      error: error.message,
    });
  }
});

module.exports = router;
