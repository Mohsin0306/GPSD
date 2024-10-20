const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    class: { 
        type: String, 
        required: true
        },
    section: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    subject: { type: String, required: true },
    principalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Principal', required: true },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
