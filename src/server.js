const express = require("express");
const cors = require("cors");

const articlesRouter = require("./routers/articles");
const usersRouter = require("./routers/users");
// const favoritesRouter = require("./src/routers/favorites");
// const questionsRouter = require("./src/routers/questions");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/users", usersRouter);
server.use("/users/:userId/articles", articlesRouter);
server.use("/articles", articlesRouter);

// server.use("/users/:userId/favorites", favoritesRouter);
// server.use("/articles/:articleId/questions", questionsRouter);

module.exports = server;
