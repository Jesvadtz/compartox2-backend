const express = require("express");
const cors = require("cors");

const usersRouter = require("./routers/users");
const articlesRouter = require("./routers/articles");
const questionsRouter = require("./routers/questions");
const responsesRouter = require("./routers/responses");
// const favoritesRouter = require("./routers/favorites");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", usersRouter);
server.use("/users/:userId/articles", articlesRouter);
// server.use("/users/:userId/questions", userQuestions)
// server.use("/users/:userId/favorites", favoritesRouter);
server.use("/articles", articlesRouter);
server.use("/articles/:articleId/questions", questionsRouter);
server.use("/questions/:questionId/responses", responsesRouter);

module.exports = server;
