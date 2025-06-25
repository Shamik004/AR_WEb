const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API endpoint to get Firebase configuration
app.get('/api/firebase-config', (req, res) => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
    
    // Check if all required config values are present
    const missingKeys = Object.keys(firebaseConfig).filter(key => !firebaseConfig[key]);
    if (missingKeys.length > 0) {
      return res.status(500).json({ error: `Missing Firebase configuration: ${missingKeys.join(', ')}` });
    }
    
    res.json(firebaseConfig);
  } catch (error) {
    console.error('Error serving Firebase config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Routes for serving HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.html'));
});

app.get('/video-feed', (req, res) => {
  res.sendFile(path.join(__dirname, 'video_feed.html'));
});

app.get('/instructions', (req, res) => {
  res.sendFile(path.join(__dirname, 'instructions.html'));
});

app.get('/fun', (req, res) => {
  res.sendFile(path.join(__dirname, 'fun.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Data Collection: http://localhost:${PORT}/data`);
  console.log(`🎨 Fun Drawing: http://localhost:${PORT}/fun`);
  console.log(`📖 Instructions: http://localhost:${PORT}/instructions`);
});