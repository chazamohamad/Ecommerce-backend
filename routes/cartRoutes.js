const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const customer = require("../middleware/customerMiddleware");

const {
  getCart,

  addToCart,

  updateQuantity,

  removeFromCart,

  clearCart,
} = require("../controllers/cartController");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart APIs
 */

// GET USER CART

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/:userId", protect, customer, getCart);

// ADD PRODUCT

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added successfully
 */
router.post("/", protect, customer, addToCart);

// CLEAR CART

/**
 * @swagger
 * /api/cart/clear/{userId}:
 *   delete:
 *     summary: Clear user cart
 *     tags: [Cart]
 *  security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
router.delete("/clear/:userId", protect, customer, clearCart);

// UPDATE QUANTITY

/**
 * @swagger
 * /api/cart/{userId}/{productId}:
 *   put:
 *     summary: Update product quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 */
router.put("/:userId/:productId", protect, customer, updateQuantity);

// REMOVE PRODUCT

/**
 * @swagger
 * /api/cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 */
router.delete("/:userId/:productId", protect, customer, removeFromCart);

module.exports = router;
