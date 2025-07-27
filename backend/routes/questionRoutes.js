const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/questions/:topic
router.get('/:topic', async (req, res) => {
  try {
    const topic = req.params.topic;
    const questions = await Question.find({ topic }); // make sure topic field exists in DB
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
