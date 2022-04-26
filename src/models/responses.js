const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    response: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 400,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("responses", responseSchema);
module.exports = model;
