const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: "articles" },
});

const model = mongoose.model("favorites", favoriteSchema);
module.exports = model;
