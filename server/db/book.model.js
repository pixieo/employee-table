const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookSchema = new Schema({
  author: String,
  title: String,
});

module.exports = mongoose.model("Book", BookSchema);