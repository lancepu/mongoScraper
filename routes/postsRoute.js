const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Comment = require("../model/Comment");

const NotFound = "Post not found, it may have been removed";

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ updatedAt: "ascending" });
    res.status(200).render("index", { posts });
  } catch (ex) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate("comment");
    if (!post) return res.status(404).send(NotFound);
    res.status(200).send(post);
  } catch (ex) {
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { comment: comment._id },
      { new: true }
    );
    if (!post) return res.status(404).send(NotFound);
    res.status(200).send(post);
  } catch (ex) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
