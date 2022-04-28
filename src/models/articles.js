const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    type: {
      type: String,
      required: true,
      enum: ["Material", "Libro"],
      default: "Material",
    },
    description: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 400,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    images: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
    },
    editorial: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("articles", articleSchema);
module.exports = model;
