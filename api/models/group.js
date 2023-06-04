const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;