const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  mainContent: { type: String, required: true },
  author: { type: String, required: true },
  aboutAuthor: { type: String },
  image: { type: String } // store image URL or Base64
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
