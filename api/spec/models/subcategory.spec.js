const mongoose = require("mongoose");
const Category = require("../../models/category");
const Subcategory = require("../../models/subcategory");

describe("Subcategory Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Category.deleteMany();
    await Subcategory.deleteMany();
  });

  it("should create and save a new subcategory connected to the correct category", async () => {
    const categoryName = "Test Category";
    const subcategoryName = "Test Subcategory";

    const category = new Category({ name: categoryName });

    await category.save();

    const subcategory = new Subcategory({
      name: subcategoryName,
      category: category._id,
    });

    const savedSubcategory = await subcategory.save();

    expect(savedSubcategory._id).toBeDefined();
    expect(savedSubcategory.name).toBe(subcategoryName);
    expect(savedSubcategory.category).toEqual(category._id);
  });

  it("should require the name field", async () => {
    try {
      const subcategory = new Subcategory();
      await subcategory.save();
    } catch (error) {
      expect(error.errors.name).toBeDefined();
    }
  });
});
