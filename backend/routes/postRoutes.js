const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const mongoose = require("mongoose");

// Create new post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts (for home page)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const posts = await Post.find(filter, "title description category image author");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      id: post._id,
      title: post.title,
      description: post.description,
      category: post.category,
      mainContent: post.mainContent,
      author: post.author,
      aboutAuthor: post.aboutAuthor,
      image: post.image,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
