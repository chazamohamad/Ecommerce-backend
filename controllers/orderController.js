const Order = require("../models/Order");

// CREATE ORDER

const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, deliveryInfo, paymentMethod } =
      req.body;

    const order = new Order({
      orderNumber: "ORD-" + Date.now(),

      userId,

      products,

      totalPrice,

      deliveryInfo,

      paymentMethod,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()

      .populate("userId", "FullName Email")

      .populate("products.productId", "title price ");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDERS BY USER ID

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })

      .populate("products.productId", "title price image");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET ORDER BY ID

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

      // get user information

      .populate("userId", "FullName Email")

      // get product details including image

      .populate("products.productId", "title price image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDER STATUS BY ORDER NUMBER

const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      orderNumber: order.orderNumber,

      status: order.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true, // Return the updated document
      },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ORDER

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,

  getAllOrders,

  getUserOrders,

  getOrderById,

  getOrderStatus,

  updateOrderStatus,

  deleteOrder,
};
