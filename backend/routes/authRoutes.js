// routes/authRoutes.js
const express = require('express');
const { registerPrincipal, registerTeacher, registerStudent, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register-principal', registerPrincipal);
router.post('/register-teacher', registerTeacher);
router.post('/register-student', registerStudent);
router.post('/login', loginUser); // New login route

module.exports = router;
