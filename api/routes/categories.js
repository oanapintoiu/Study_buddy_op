const express = require("express");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

const router = express.Router();

// Route for fetching all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for fetching subcategories based on category
router.get("/:category/subcategories", async (req, res) => {
  const { category } = req.params;

  try {
    const subcategories = await Subcategory.find({ category });
    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
