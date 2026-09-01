const Product = require("../models/Product");

// GET ALL PRODUCTS

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PRODUCT BY ID

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name",
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PRODUCT

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      image: req.body.image,
      review: req.body.review,
      category: req.body.categoryId, // Assuming the category ID is sent in the request body
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      image: req.body.image,
      review: req.body.review,
    };

    // if category is updated
    if (req.body.categoryId) {
      updateData.category = req.body.categoryId;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
