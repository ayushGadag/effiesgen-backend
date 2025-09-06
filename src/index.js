// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');   // DB import

// Models import (जरूरी models sync के लिए)
const User = require('./models/User');
// अगर future में और models हैं तो यहां import कर सकते हो:
// const Exam = require('./models/Exam');
// const Student = require('./models/Student');
// const Invigilator = require('./models/Invigilator');

const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const settingsRoutes = require('./routes/settings');
const collaborationRoutes = require('./routes/collaboration');
const studentRoutes = require('./routes/students');
const invigilatorRoutes = require('./routes/invigilators');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/invigilators', invigilatorRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Backend working fine!');
});

// ✅ Database connect + server start
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync({ alter: true }); // tables auto create/update
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error: ' + err));
