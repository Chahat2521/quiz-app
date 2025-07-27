const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Question = require('../models/Question');

mongoose.connect('mongodb://localhost:27017/quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filePath = path.join(__dirname, 'questions.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading questions file:', err);
    process.exit(1);
  }
  const questions = JSON.parse(data);

  questions.forEach(async (question) => {
    const newQuestion = new Question(question);
    try {
      await newQuestion.save();
      console.log('Question saved:', question.questionText);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  });
});
