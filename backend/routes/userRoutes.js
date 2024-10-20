const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get the list of teachers
router.get('/teachers', userController.getTeachers);

// Route to get the list of students
router.get('/students', userController.getStudents);

// Route to get the list of principals
router.get('/principals', userController.getPrincipals);

// Route to get students for a specific teacher
router.get('/teachers/:teacherId/students', userController.getStudentsForTeacher);

// Route to get the teacher dashboard by teacher ID
router.get('/teacherDashboard/:teacherId', userController.getTeacherDashboard);

// Route to delete a teacher by ID
router.delete('/teachers/:id', userController.deleteTeacher);

// Route to delete a student by ID
router.delete('/students/:id', userController.deleteStudent);

// Route to delete a principal by ID
router.delete('/principals/:id', userController.deletePrincipal);

module.exports = router;
