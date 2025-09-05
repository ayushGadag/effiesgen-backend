require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');   // DB import

// routes import
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const settingsRoutes = require('./routes/settings');
const collaborationRoutes = require('./routes/collaboration');
const studentRoutes = require('./routes/students');        // ✅ New
const invigilatorRoutes = require('./routes/invigilators'); // ✅ New

const app = express();   
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/students', studentRoutes);        // ✅ New
app.use('/api/invigilators', invigilatorRoutes); // ✅ New

// test route
app.get('/', (req, res) => {
  res.send('✅ Backend working fine!');
});

// DB connect check + server start
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync(); // tables auto create
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Error: ' + err));
