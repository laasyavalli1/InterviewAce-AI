const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');
const dns = require('dns');

// Force clean DNS resolution servers to prevent connection drops
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const interviewRoutes = require('./routes/interview');
const bookmarkRoutes = require('./routes/bookmark');
const analyticsRoutes = require('./routes/analytics')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Routes
app.use('/api/auth', authRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/analytics', analyticsRoutes);
// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interviewace')
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));