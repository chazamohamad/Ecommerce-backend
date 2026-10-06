const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const customer = require("../middleware/customerMiddleware");

const {
  createOrder,

  getAllOrders,

  getUserOrders,

  getOrderStatusStatistics,

  getOrderByMonth,

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
 *     security:
 *       - bearerAuth: []
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

router.post("/", protect, customer, createOrder);

// GET ALL ORDERS

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */

router.get("/", protect, admin, getAllOrders);

// GET USER ORDERS

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
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
 *         description: User orders fetched successfully
 */

router.get("/user/:userId", protect, getUserOrders);

// GET ORDER STATUS STATISTICS
/**
 * @swagger
 * /api/orders/status-statistics:
 *   get:
 *     summary: Get order status statistics
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   example: 100
 *
 *                 statistics:
 *                   type: object
 *                   properties:
 *
 *                     pending:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                           example: 20
 *                         percentage:
 *                           type: integer
 *                           example: 20
 *
 *                     completed:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                           example: 50
 *                         percentage:
 *                           type: integer
 *                           example: 50
 *
 *                     ondelivery:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                           example: 30
 *                         percentage:
 *                           type: integer
 *                           example: 30
 *
 *       401:
 *         description: Unauthorized - missing or invalid token
 *
 *       403:
 *         description: Forbidden - admin access required
 *
 *       500:
 *         description: Server error
 */
router.get("/status-statistics", protect, admin, getOrderStatusStatistics);

// GET ORDER BY MONTH

/**
 * @swagger
 * /api/orders/completed-by-month:
 *   get:
 *     summary: Get completed orders statistics by month
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2025
 *         description: Year to get completed orders statistics
 *     responses:
 *       200:
 *         description: Completed orders count by month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                   example: 2025
 *                 statistics:
 *                   type: object
 *                   example:
 *                     Jan: 14
 *                     Feb: 20
 *                     Mar: 8
 *                     Dec: 70
 *       400:
 *         description: Year is required
 *       500:
 *         description: Server error
 */
router.get("/completed-by-month", protect, admin, getOrderByMonth);

// GET ORDER BY ID

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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

router.get("/:id", protect, admin, getOrderById);

// GET ORDER STATUS BY ORDER NUMBER

/**
 * @swagger
 * /api/orders/status/{orderNumber}:
 *   get:
 *     summary: Get order status by order number
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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

router.get("/status/:orderNumber", protect, getOrderStatus);

// UPDATE STATUS

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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

router.put("/:id", protect, admin, updateOrderStatus);

// DELETE ORDER

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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

router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
