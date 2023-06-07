const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  avatar: { type: String, required: false },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group", default: [] }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
