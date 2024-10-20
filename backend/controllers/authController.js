const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Principal = require('../models/Principal');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Utility function to generate JWT
const generateToken = (userId, role) => {
    return jwt.sign(
        { user: { id: userId, role } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register Principal
exports.registerPrincipal = async (req, res) => {
    const { username, name, password, uniqueCode } = req.body;
    
    if (uniqueCode !== 'Mohsin0307') {
        return res.status(400).json({ message: 'Invalid unique code' });
    }

    try {
        let principal = await Principal.findOne({ username });
        if (principal) {
            return res.status(400).json({ message: 'Principal already exists' });
        }

        principal = new Principal({ username, name, password, uniqueCode });
        const salt = await bcrypt.genSalt(10);
        principal.password = await bcrypt.hash(password, salt);
        await principal.save();

        const token = generateToken(principal.id, 'Principal');
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Register Teacher
exports.registerTeacher = async (req, res) => {
    const { username, name, password, class: classNumber, section, subject, principalId } = req.body;

    try {
        const principal = await Principal.findById(principalId);
        if (!principal) {
            return res.status(400).json({ message: 'Invalid principal ID' });
        }

        let teacher = await Teacher.findOne({ username });
        if (teacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        teacher = new Teacher({ 
            username, 
            name, 
            password, 
            class: String(classNumber), // Convert class to a string
            section, 
            subject, 
            principalId 
        });

        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);
        await teacher.save();

        const token = generateToken(teacher.id, 'Teacher');
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Register Student
exports.registerStudent = async (req, res) => {
    const { username, name, password, rollNumber, email, class: classNumber, section } = req.body;
    const classAsString = String(classNumber);

    try {
        // Fetch all teachers for the given class and section
        const teachers = await Teacher.find({ class: classAsString, section });
        if (teachers.length === 0) {
            return res.status(400).json({ message: 'No teachers found for the specified class and section' });
        }

        let student = await Student.findOne({ username });
        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Collect teacher IDs to associate with the student
        const teacherIds = teachers.map(teacher => teacher._id);

        student = new Student({ 
            username, 
            name, 
            password, 
            rollNumber, 
            email, 
            class: classAsString, 
            section, 
            teacherIds 
        });

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);
        await student.save();

        const token = generateToken(student.id, 'Student');
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for Principal, Teacher, or Student based on username
        let user = await Principal.findOne({ username }) 
                    || await Teacher.findOne({ username }) 
                    || await Student.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Determine user role for token generation
        const role = user instanceof Principal ? 'Principal' : user instanceof Teacher ? 'Teacher' : 'Student';
        const token = generateToken(user.id, role);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
