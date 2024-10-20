const mongoose = require('mongoose');

const teacherDashboardSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    subjects: [{
        type: String,
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    // Add more fields as necessary
});

module.exports = mongoose.model('TeacherDashboard', teacherDashboardSchema);
