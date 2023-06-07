const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  ai_question: { type: String, required: false },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
