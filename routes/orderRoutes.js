const express = require("express");

const router = express.Router();

const {
  createOrder,

  getAllOrders,

  getUserOrders,

  updateOrderStatus,

  deleteOrder,
} = require("../controllers/orderController");

// CREATE

router.post("/", createOrder);

// ADMIN GET ALL

router.get("/", getAllOrders);

// USER ORDERS

router.get("/user/:userId", getUserOrders);

// UPDATE STATUS

router.put("/:id", updateOrderStatus);

// DELETE

router.delete("/:id", deleteOrder);

module.exports = router;
