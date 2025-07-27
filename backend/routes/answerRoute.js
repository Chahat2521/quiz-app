const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer'); // ✅ import your model

router.post('/submit', async (req, res) => {
  try {
    console.log('Received answer submission:', req.body);
    const { username, topic, answers, score, timeTaken } = req.body;

    const newAnswer = new Answer({ username, topic, answers, score, timeTaken });
    console.log('New Answer object:', newAnswer);
    await newAnswer.save()
      .then(() => console.log('Answer saved successfully'))
      .catch((saveErr) => {
        console.error('Validation or save error:', saveErr);
        throw saveErr;
      });

    res.status(201).json({ message: 'Answers submitted successfully!' });
  } catch (err) {
    console.error('Error saving answer:', err);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
});

module.exports = router; // ✅ export the router
