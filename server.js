const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ritesh_portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection failed:', err.message));

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  tech: [String],
  link: String
});

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Message = mongoose.model('Message', messageSchema);

const defaultProjects = [
  {
    title: 'GetJet Flight Booking System',
    category: 'Full Stack',
    description: 'A flight booking web app with login, flight search, booking flow, payment screen, and ticket generation.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
    link: '#'
  },
  {
    title: 'Bus Management System',
    category: 'Database Project',
    description: 'A system to manage buses, routes, passengers, booking records, and schedules efficiently.',
    tech: ['Java', 'JDBC', 'SQL'],
    link: '#'
  },
  {
    title: 'Holographic Fan Display',
    category: 'IoT Project',
    description: 'An ESP32 based POV display concept using addressable LEDs for hologram-like visuals.',
    tech: ['ESP32', 'FastLED', 'Arduino', 'WS2812B'],
    link: '#'
  }
];

app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Ritesh Boje',
    role: 'Computer Engineering Student',
    location: 'Maharashtra, India',
    email: 'riteshboje2005@gmail.com',
    summary: 'I am a Computer Engineering student interested in full-stack development, databases, IoT, and building practical software projects.'
  });
});

app.get('/api/projects', async (req, res) => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) await Project.insertMany(defaultProjects);
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.json(defaultProjects);
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    await Message.create({ name, email, message });
    res.json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not save message.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
