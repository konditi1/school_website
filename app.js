const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Student = require('./models/Student')
const Staff = require('./models/Staff');
const sendEmailNotification = require('./public/js/emailService');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// const isStrongPassword = require('./models/isStrongPassword');
const emailValidator = require('email-validator');

// Create an Express app
const app = express();

// Configure Sass middleware
app.use(
  '/css', 
  sassMiddleware({
    src: path.join(__dirname, 'scss'), // Path to your SCSS files
    dest: path.join(__dirname, 'public/css'), // Path to your CSS files
    debug: true, // Enable debug output (optional)
    outputStyle: 'compressed' // Minify CSS (optional)
  })
);

// Serve static files (like CSS, images, etc.)
app.use(express.static('public'));

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// 
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit();
});

// Define routes for user registration
        app.post('/register', async (req, res) => {
          
      const { name, email, password } = req.body;
    try {
      // Check if a staff member with staff number already exists
      const existingStaff = await Staff.findOne({ staffNumber: name });
      if(existingStaff?.id){
        // Check if email is valid
        if (!emailValidator.validate(email)) {
          return res.status(400).json({ message: 'Invalid email' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
            // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({ name: name, email: email, password: hashedPassword });
      //  return res.status(400).json({ message: `${hashedPassword}` });
          await newUser.save();

          // Send welcome email notification
          sendEmailNotification(email, 'Welcome to LAKEHEAD COLLEGE!',
          `Thank you ${name} for registering with LAKEHEAD COLLEGE.
          your password is ${password}`);
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        return res.status(401).json({ message: 'Not a staff member' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Define routes for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;   
    const user = await User.findOne({ email });
    //return res.status(400).json({ message: `${user}` });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: '${user.name} successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/students', async (req, res) => {
  try {
    //Get all students from the database
    var str = await Student.find()
    res.status(200).json( str);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/student', async (req, res) => {
  try {
    const { name, contact, admissionNumber, faculty, year } = req.body;

    // Check if the student with the same admission number already exists
    const existingStudent = await Student.findOne({ admissionNumber });
    if (existingStudent?.id) {
      return res.status(400).json({ message: 'Student with the same admission number already exists' });
    }

    // Create a new student
    const newStudent = new Student({ name, contact, admissionNumber, faculty, year });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
