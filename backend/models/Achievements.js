// models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
