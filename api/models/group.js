const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
  partySize: {type: Number, required: false},
  level: {type: String, required: false},
  private: { type: Boolean, default: false },
  description: { type: String, required: false },

});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
