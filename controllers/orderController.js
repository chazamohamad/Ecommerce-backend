const Order = require("../models/Order");

// CREATE ORDER

const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, phoneNumber, address } = req.body;

    const order = new Order({
      orderNumber: "ORD-" + Date.now(),

      userId,

      products,

      totalPrice,

      phoneNumber,

      address,
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

      .populate("products.productId", "title price image");

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

// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true,
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

  updateOrderStatus,

  deleteOrder,
};
