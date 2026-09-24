const express = require("express");

const router = express.Router();

const {
  getProducts,

  getProductById,

  createProduct,

  deleteProduct,

  updateProduct,
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

// GET ALL

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get("/", getProducts);

// GET BY ID

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

// CREATE

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Modern Sofa
 *               desc:
 *                 type: string
 *                 example: Comfortable sofa
 *               price:
 *                 type: number
 *                 example: 1400
 *               image:
 *                 type: string
 *                 example: sofa.jpg
 *               review:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", createProduct);

// DELETE

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", deleteProduct);

// UPDATE

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               review:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/:id", updateProduct);

module.exports = router;
