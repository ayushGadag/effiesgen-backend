// src/index.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');   // DB import
const authRoutes = require('./routes/auth');

const app = express();   // पहले app declare करो
app.use(express.json());

// auth routes
app.use('/api/auth', authRoutes);

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
