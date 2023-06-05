const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  const selectedCategory = req.params.category;

  try {
    const category = await Category.findById(selectedCategory).populate('subcategories', 'name');

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category.subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'An error occurred while fetching subcategories.' });
  }
};

module.exports = { getAllCategories, getSubcategoriesByCategory };
