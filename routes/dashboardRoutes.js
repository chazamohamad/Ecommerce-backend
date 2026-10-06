const express = require("express");

const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProducts:
 *                   type: integer
 *                   example: 25
 *                 totalOrders:
 *                   type: integer
 *                   example: 100
 *                 pendingOrders:
 *                   type: integer
 *                   example: 20
 *                 completedOrders:
 *                   type: integer
 *                   example: 60
 *                 onDeliveryOrders:
 *                   type: integer
 *                   example: 20
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - admin access required
 *       500:
 *         description: Server error
 */

router.get("/stats", protect, admin, getDashboardStats);

module.exports = router;
