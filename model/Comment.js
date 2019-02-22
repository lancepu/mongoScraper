const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    title: String,
    body: String
  },
  { timestamps: { createdAt: "created_at" } }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
