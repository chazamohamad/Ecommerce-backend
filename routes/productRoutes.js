const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// GET ALL

router.get("/", getProducts);

// GET BY ID

router.get("/:id", getProductById);

// CREATE

router.post("/", createProduct);

// DELETE

router.delete("/:id", deleteProduct);

// UPDATE

router.put("/:id", updateProduct);

module.exports = router;
