const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Principal = require('../models/Principal');
const TeacherDashboard = require('../models/teacherDashboard'); // Correct import
const mongoose = require('mongoose');

// Get all Teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select('_id username class section subject');
        res.status(200).json(teachers);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Error fetching teachers", error: error.message });
    }
};

// Get all Students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().select('_id name rollNumber class section');
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

// Get Teacher Dashboard
const getTeacherDashboard = async (req, res) => {
    const { teacherId } = req.params;

    // Validate Teacher ID format
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: "Invalid Teacher ID" });
    }

    try {
        // Fetch the teacher dashboard information using the teacherId
        const teacherDashboard = await TeacherDashboard.findOne({ teacher: teacherId });

        if (!teacherDashboard) {
            return res.status(404).json({ message: "Teacher dashboard not found" });
        }

        res.status(200).json(teacherDashboard);
    } catch (error) {
        console.error("Error fetching teacher dashboard:", error);
        res.status(500).json({ message: "Error fetching teacher dashboard data", error: error.message });
    }
};

// Delete a Teacher
const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Teacher ID" });
    }

    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({ message: "Error deleting teacher", error: error.message });
    }
};

// Delete a Student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Student ID" });
    }

    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
};

// Get all Principals
const getPrincipals = async (req, res) => {
    try {
        const principals = await Principal.find().select('_id name username');
        res.status(200).json(principals);
    } catch (error) {
        console.error("Error fetching principals:", error);
        res.status(500).json({ message: "Error fetching principals", error: error.message });
    }
};

// Delete a Principal
const deletePrincipal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Principal ID" });
    }

    try {
        const principal = await Principal.findByIdAndDelete(id);
        if (!principal) {
            return res.status(404).json({ message: "Principal not found" });
        }
        res.status(200).json({ message: "Principal deleted successfully" });
    } catch (error) {
        console.error("Error deleting principal:", error);
        res.status(500).json({ message: "Error deleting principal", error: error.message });
    }
};

// Get Students for a specific Teacher
const getStudentsForTeacher = async (req, res) => {
    const { teacherId } = req.params;

    // Validate Teacher ID format
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: "Invalid Teacher ID" });
    }

    try {
        // Fetch students linked to the specified teacher
        const students = await Student.find({ teacherIds: teacherId })
            .select('_id name rollNumber class section');
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students for the teacher:", error);
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

module.exports = {
    getTeachers,
    getStudents,
    deleteTeacher,
    deleteStudent,
    getPrincipals,
    deletePrincipal,
    getTeacherDashboard,
    getStudentsForTeacher,
};
