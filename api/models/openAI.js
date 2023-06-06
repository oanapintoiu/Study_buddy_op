// once schema is created and have tests, create a controller for openAI to store questions/responses to database

const mongoose = require("mongoose");

const OpenAISchema = new mongoose.Schema({
  question: { type: String, required: true },
  response: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  timestamp: { type: Date, default: Date.now }
});

const OpenAI = mongoose.model("OpenAI", OpenAISchema);

module.exports = OpenAI;