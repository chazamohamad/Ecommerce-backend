const express = require("express");

const router = express.Router();

const {
  createOrder,

  getAllOrders,

  getUserOrders,

  getOrderById,

  getOrderStatus,

  updateOrderStatus,

  deleteOrder,
} = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

// CREATE ORDER

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created successfully
 */

router.post("/", createOrder);

// GET ALL ORDERS

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */

router.get("/", getAllOrders);

// GET USER ORDERS

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 */

router.get("/user/:userId", getUserOrders);

// GET ORDER BY ID

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */

router.get("/:id", getOrderById);

// GET ORDER STATUS BY ORDER NUMBER

/**
 * @swagger
 * /api/orders/status/{orderNumber}:
 *   get:
 *     summary: Get order status by order number
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Order number
 *         example: ORD-172658932
 *     responses:
 *       200:
 *         description: Order status fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderNumber:
 *                   type: string
 *                   example: ORD-172658932
 *                 status:
 *                   type: string
 *                   example: pending
 *
 *       404:
 *         description: Order not found
 *
 *       500:
 *         description: Server error
 */

router.get("/status/:orderNumber", getOrderStatus);

// UPDATE STATUS

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

router.put("/:id", updateOrderStatus);

// DELETE ORDER

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

router.delete("/:id", deleteOrder);

module.exports = router;
