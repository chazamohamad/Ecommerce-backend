const express = require("express");

const router = express.Router();

const {
  getCategories,

  getCategoryById,

  createCategory,

  updateCategory,

  deleteCategory,
} = require("../controllers/categoryController");

// GET ALL

router.get("/", getCategories);

// GET BY ID

router.get("/:id", getCategoryById);

// CREATE

router.post("/", createCategory);

// UPDATE

router.put("/:id", updateCategory);

// DELETE

router.delete("/:id", deleteCategory);

module.exports = router;
