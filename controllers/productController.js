const Product = require("../models/Product");

// GET ALL PRODUCTS WITH PAGINATION + SEARCH

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    let filter = {};

    // SEARCH BY TITLE

    if (search) {
      filter = {
        title: {
          $regex: search,

          $options: "i",
        },
      };
    }

    const products = await Product.find(filter)

      .populate("category", "name")

      .skip(skip)

      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      products,

      currentPage: page,

      totalPages: Math.ceil(totalProducts / limit),

      totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PRODUCT BY ID

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

      .populate("category", "name");

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

      category: req.body.categoryId,

      quantityInStock: req.body.quantityInStock ?? 0,

      salePercentage: req.body.salePercentage ?? 0,
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
    const updateData = {};

    if (req.body.title !== undefined) {
      updateData.title = req.body.title;
    }

    if (req.body.desc !== undefined) {
      updateData.desc = req.body.desc;
    }

    if (req.body.price !== undefined) {
      updateData.price = req.body.price;
    }

    if (req.body.image !== undefined) {
      updateData.image = req.body.image;
    }

    if (req.body.review !== undefined) {
      updateData.review = req.body.review;
    }

    // UPDATE STOCK ONLY IF SENT

    if (req.body.quantityInStock !== undefined) {
      updateData.quantityInStock = req.body.quantityInStock;
    }

    // UPDATE SALE ONLY IF SENT

    if (req.body.salePercentage !== undefined) {
      updateData.salePercentage = req.body.salePercentage;
    }

    // UPDATE CATEGORY

    if (req.body.categoryId) {
      updateData.category = req.body.categoryId;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,

      updateData,

      {
        new: true,
      },
    )

      .populate("category", "name");

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
