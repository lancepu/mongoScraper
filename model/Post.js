const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // Prevents duplicate articles being populated to database
      unique: true
    },
    link: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String
    },
    saved: {
      type: Boolean
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
