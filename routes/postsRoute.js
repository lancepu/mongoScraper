const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Comment = require("../model/Comment");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ saved: { $ne: true } }).sort({
      created_at: "desc"
    });
    res.status(200).render("index", { posts });
  } catch (ex) {
    res.status(500).render("notFound");
  }
});

router.get("/saved", async (req, res) => {
  try {
    const posts = await Post.find({ saved: true }).sort({ created_at: "desc" });
    res.status(200).render("savedIndex", { posts });
  } catch (ex) {
    res.status(500).render("notFound");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate("comment");
    if (!post) return res.status(404).render("notFound");
    res.status(200).render("singlePost", { post });
  } catch (ex) {
    res.status(500).render("notFound");
  }
});

router.put("/save/:id", async (req, res) => {
  // TOGGLES BETWEEN SAVE AND UNSAVE
  try {
    const post = await Post.findOne({ _id: req.params.id });
    await Post.findOneAndUpdate({ _id: req.params.id }, { saved: !post.saved });
    if (!post) return res.status(404).render("notFound");
    res.status(200).end();
  } catch (ex) {
    res.status(500).render("notFound");
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
    if (!post) return res.status(404).render("notFound");
    res.status(200).send(post);
  } catch (ex) {
    res.status(500).render("notFound");
  }
});

module.exports = router;
