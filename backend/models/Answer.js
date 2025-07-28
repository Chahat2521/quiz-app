const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Answer", answerSchema, "answers");
