const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    articles: { type: mongoose.Schema.Types.ObjectId, ref: "articles" },
    favorites: { type: mongoose.Schema.Types.ObjectId, ref: "favorites" },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("users", userSchema);
module.exports = model;
