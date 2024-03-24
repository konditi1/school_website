const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const isStrongPassword = require('./models/isStrongPassword');
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
    try {
      const { name, email, password1, password } = req.body;
      console.log(name, email, password1, password);

     if (!name || name.length === 0) {
        return res.status(400).json({ message: 'Name is required' });
      }

      // Check if the email format is valid
      if (!emailValidator.validate(email)) {
          return res.status(400).json({ message: 'Invalid email format' });
        }
      // Check if the passwords match
        if (password1 !== password) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
      // Check if the password meets the required strength
      if (!isStrongPassword(password)) {
        return res.status(400).json({ message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character !@#$%^&*()_+-=[]{};:"\\|,.<>/?' });
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
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
