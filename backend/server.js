// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import required modules
const express = require('express');         // Web framework to build API
const mongoose = require('mongoose');       // MongoDB tool
const cors = require('cors');               // To handle Cross-Origin Resource Sharing (CORS)
const questionRoutes = require('./routes/questionRoutes'); // Routes for quiz questions
const answerRoute = require('./routes/answerRoute');        // Routes for quiz answers

// Created an Express app
const app = express();

// Set server port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Enable CORS to allow requests from frontend domain
app.use(cors({
  origin: 'https://quiz-app-ten-alpha-22.vercel.app', // allows requests from deployed frontend
  methods: ['GET', 'POST'],                           // Allow only GET and POST HTTP methods
  credentials: true                                   // Allow credentials like cookies if needed
}));

// Middleware to parse incoming JSON requests 
app.use(express.json());

// Using imported routes for questions and answers
app.use('/questions', questionRoutes);   // All routes starting with questions will go to questionRoutes
app.use('/answers', answerRoute);        // All routes starting with answers will go to answerRoute

// MongoDB connection string
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://chahatchauhan1616:Chahat123@cluster21.ls9c4hd.mongodb.net/quizDB?retryWrites=true&w=majority&appName=Cluster21';

// Connecting to MongoDB using Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,      // Use new URL parser 
  useUnifiedTopology: true    // Use new Server Discovery and Monitoring engine
}).then(() => {
  console.log('Connected to MongoDB');  // Connection successful
}).catch((err) => {
  console.error('MongoDB connection error:', err);  // Log connection error
  process.exit(1);  // Exits the app if DB connection fails
});

// Define a schema for users
const userSchema = new mongoose.Schema({
  name: String,                     // User's name
  email: { type: String, unique: true }, // Email must be unique
  password: String                 // Password
}, { collection: 'data' });        // Save user data  in 'data' collection

// Create a model from the user schema
const User = mongoose.model('User', userSchema);

// Register route handles new user signup
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Ensure all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Checks if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handles any errors if occurred
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route handles user authentication
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Checks if credentials are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Finds user by email
    const user = await User.findOne({ email });

    // Checks if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Returns user info 
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    // Handles server errors
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Root route test endpoint to confirm backend is running
app.get("/", (req, res) => {
  res.send("Quiz backend is running!");  // checked in browser
});

// Starts the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
