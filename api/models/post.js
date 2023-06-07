const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
