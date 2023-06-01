const mongoose = require('mongoose');
const Category = require('../../models/category');

describe('Category Model', () => {
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
    // Clear the collection after each test
    await Category.deleteMany();
  });

  it('should create and save a new category', async () => {
    const categoryName = 'Test Category';

    // Create a new category instance
    const category = new Category({ name: categoryName });

    // Save the category to the database
    const savedCategory = await category.save();

    // Expect the saved category to have the correct name and an auto-generated ID
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe(categoryName);
  });

  it('should require the name field', async () => {
    try {
      // Create a category without the name field
      const category = new Category();

      // Save the category to trigger validation errors
      await category.save();
    } catch (error) {
      // Expect a validation error to be thrown due to the missing name field
      expect(error.errors.name).toBeDefined();
    }
  });
});