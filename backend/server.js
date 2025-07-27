require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const answerRoute = require('./routes/answerRoute'); 

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORRECT CORS CONFIGURATION
app.use(cors({
  origin: 'https://quiz-app-ten-alpha-22.vercel.app', // your frontend domain
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ JSON parser must come AFTER cors
app.use(express.json());

// ✅ Use your route files
app.use('/questions', questionRoutes);
app.use('/answers', answerRoute); 

// ✅ MongoDB connection
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

// ✅ User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
}, { collection: 'data' });

const User = mongoose.model('User', userSchema);

// ✅ Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Quiz backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
