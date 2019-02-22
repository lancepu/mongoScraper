const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Comment = require("../model/Comment");

const NotFound = "Comment not found, it may have been removed";

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body },
      { new: true }
    );
    if (!comment) return res.status(404).send(NotFound);
    res.status(200).send(comment);
  } catch (ex) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id });
    if (!comment) return res.status(404).send(NotFound);
    res.status(200).end();
  } catch (ex) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
