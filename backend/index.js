// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/eventRoutes');
const quickLinksRoutes = require('./routes/quickLinks');
const achievementRoutes = require('./routes/achievementRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/quick-links', quickLinksRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/auth', authRoutes); // Include auth routes
app.use('/api', userRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
