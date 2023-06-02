const mongoose = require('mongoose');
const Category = require('../../models/category');
const Subcategory = require('../../models/subcategory');

describe('Subcategory Model', () => {
  beforeAll(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests are finished
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the collections after each test
    await Category.deleteMany();
    await Subcategory.deleteMany();
  });

  it('should create and save a new subcategory connected to the correct category', async () => {
    const categoryName = 'Test Category';
    const subcategoryName = 'Test Subcategory';

    // Create a new category instance
    const category = new Category({ name: categoryName });

    // Save the category to the database
    await category.save();

    // Create a new subcategory instance connected to the category
    const subcategory = new Subcategory({ name: subcategoryName, category: category._id });

    // Save the subcategory to the database
    const savedSubcategory = await subcategory.save();

    // Expect the saved subcategory to have the correct name, an auto-generated ID,
    // and be connected to the correct category
    expect(savedSubcategory._id).toBeDefined();
    expect(savedSubcategory.name).toBe(subcategoryName);
    expect(savedSubcategory.category).toEqual(category._id);
  });

  it('should require the name field', async () => {
    try {
      // Create a subcategory without the name field
      const subcategory = new Subcategory();

      // Save the subcategory to trigger validation errors
      await subcategory.save();
    } catch (error) {
      // Expect a validation error to be thrown due to the missing name field
      expect(error.errors.name).toBeDefined();
    }
  });
});
