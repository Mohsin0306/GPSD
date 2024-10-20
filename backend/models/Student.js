// models/Student.js

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    rollNumber: { type: String, required: true },
    email: { type: String, required: true },
    class: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], required: true },
    section: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }], // Array to store multiple teacher IDs
});

module.exports = mongoose.model('Student', StudentSchema);
