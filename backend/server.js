require('dotenv').config();                     // Load .env variables
const express = require('express');             // Express web framework
const mongoose = require('mongoose');           // MongoDB ORM
const cors = require('cors');                   // Enable CORS
const bcrypt = require('bcrypt');               // 🔐 For password hashing
const questionRoutes = require('./routes/questionRoutes');
const answerRoute = require('./routes/answerRoute');

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Allow requests from your Vercel frontend
app.use(cors({
  origin: 'https://quiz-app-ten-alpha-22.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Register question & answer route files
app.use('/questions', questionRoutes);
app.use('/answers', answerRoute);

// ✅ Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://chahatchauhan1616:Chahat123@cluster21.ls9c4hd.mongodb.net/quizDB?retryWrites=true&w=majority&appName=Cluster21';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// ✅ Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed password will be stored here
}, { collection: 'data' });

const User = mongoose.model('User', userSchema);

// ✅ Register endpoint with password hashing
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 🔐 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user with hashed password
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Login endpoint with password verification
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 🔐 Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return basic user info
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Quiz backend is running!");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
