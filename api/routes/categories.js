const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categories");

router.get("/", CategoryController.getAllCategories);
router.get("/:category/subcategories", CategoryController.getSubcategoriesByCategory);

module.exports = router;