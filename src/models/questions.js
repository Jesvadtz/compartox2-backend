const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 400,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    response: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "responses",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("questions", questionSchema);
module.exports = model;
