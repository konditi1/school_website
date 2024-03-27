const express = require('express');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const app = express();

// Import route handlers
const userRoutes = require('./app/routes/userRoutes');
//const studentRoutes = require('./app/routes/studentRoutes');

// Database configuration
require('./config/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    '/css', 
    sassMiddleware({
      src: path.join(__dirname, 'scss'), // Path to your SCSS files
      dest: path.join(__dirname, 'public/css'), // Path to your CSS files
      debug: true, // Enable debug output (optional)
      outputStyle: 'compressed' // Minify CSS (optional)
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Routes
app.use('/user', userRoutes);
//app.use('/student', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
