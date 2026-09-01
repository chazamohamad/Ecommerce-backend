const Category = require("../models/category");

// GET ALL CATEGORIES

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CATEGORY BY ID

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE CATEGORY

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,

      desc: req.body.desc,
    });

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,

  getCategoryById,

  createCategory,

  updateCategory,

  deleteCategory,
};
