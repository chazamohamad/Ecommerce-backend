const express = require("express");

const router = express.Router();

const {
  getCart,

  addToCart,

  updateQuantity,

  removeFromCart,

  clearCart,
} = require("../controllers/cartController");

// GET USER CART

router.get("/:userId", getCart);

// ADD PRODUCT

router.post("/", addToCart);

// UPDATE QUANTITY

router.put("/:userId/:productId", updateQuantity);

// REMOVE PRODUCT

router.delete("/:userId/:productId", removeFromCart);

// CLEAR CART

router.delete("/clear/:userId", clearCart);

module.exports = router;
