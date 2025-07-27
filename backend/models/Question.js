const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    enum: ['html', 'css', 'react'],
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [arr => arr.length === 4, 'Must have 4 options'],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

// ✅ Explicitly use "question" collection name
module.exports = mongoose.model('Question', questionSchema, 'question');
