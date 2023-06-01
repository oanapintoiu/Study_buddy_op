const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const populateDatabase = require('./data');
const { getAllCategories, getSubcategoriesByCategory } = require('./categoryController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up Mongoose connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    populateDatabase(); // Call the function to populate the database
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.get('/categories', getAllCategories); // Get all categories
app.get('/subcategories', getSubcategoriesByCategory); // Get subcategories by category

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});