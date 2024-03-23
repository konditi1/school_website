const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
require('dotenv').config();

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

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
