// routes/Posts.routes.js
const express = require("express");
const Post = require("../models/Posts.model");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// ✅ Get all posts
router.get("/", protect, async (req, res) => {
  const posts = await Post.find().populate("user", "name email");
  res.json(posts);
});

// ✅ Get single post
router.get("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", "name email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// ✅ Create post
router.post("/", protect, async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const post = new Post({ title, description, imageUrl, user: req.user._id });
  await post.save();
  res.status(201).json(post);
});

// ✅ Update post
router.put("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  post.title = req.body.title || post.title;
  post.description = req.body.description || post.description;
  post.imageUrl = req.body.imageUrl || post.imageUrl;

  const updatedPost = await post.save();
  res.json(updatedPost);
});

// ✅ Delete post
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

module.exports = router;
